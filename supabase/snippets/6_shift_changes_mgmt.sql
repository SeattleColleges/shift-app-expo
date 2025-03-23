/*
-- Create shift changes table
- Handle user adding shift to shift_change table
- Handle user no longer wanting to give up shift
- Handle swapping user ids once approved by supervisor

- Serial used for testing, will be UUID so each shift_change ID will be unique
// Enum order matters: (0,1,2,3)

DROP TABLE IF EXISTS shift_changes;
DROP TYPE IF EXISTS shift_status;
*/

-- Create Enums for shift_status
CREATE TYPE SHIFT_STATUS AS ENUM ('removed','denied','unclaimed','pending','approved');

CREATE TABLE shift_changes
(
    shift_change_id           SERIAL PRIMARY KEY,
    shift_id                  INT REFERENCES shifts (shift_id),
    og_shift_profile_id       INT REFERENCES profiles (profile_int_id),
    covering_profile_id       INT REFERENCES profiles (profile_int_id),
    approved_by_supervisor_id INT REFERENCES supervisors (supervisor_id),
    denied_by_supervisor_id   INT REFERENCES supervisors (supervisor_id),
    status                    SHIFT_STATUS NOT NULL DEFAULT 'unclaimed',
    coverage_reason           TEXT,
    requested_at              TIMESTAMPTZ           DEFAULT NOW()
);
-- Add shifts to shift_changes table
CREATE
    OR REPLACE FUNCTION add_shift_to_shift_change(
    shift_id_param INT,
    coverage_reason_param TEXT DEFAULT 'No reason provided'
)
    RETURNS BOOLEAN AS
$$
DECLARE
    shift_rec RECORD;
BEGIN
    -- Get shift and save
    SELECT *
    INTO shift_rec
    FROM shifts
    WHERE shift_id = shift_id_param;

-- Handle missing record
    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    END IF;

    UPDATE shifts
    SET needs_coverage = TRUE
    WHERE shift_id = shift_id_param;

-- Add to shift_changes
    INSERT INTO shift_changes(shift_id, og_shift_profile_id, coverage_reason)
    VALUES (shift_rec.shift_id, shift_rec.assigned_user_id, coverage_reason_param);

    RETURN TRUE;
-- Handle errors, returns to func caller
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;
$$
    LANGUAGE plpgsql;

-- Handles case if shift owner changing their mind
CREATE
    OR REPLACE FUNCTION shift_owner_removed_shift(
    shift_id_param INT
)
    RETURNS BOOLEAN AS
$$
DECLARE
    shift_rec RECORD;
BEGIN
    -- Update, change status to removed, and set shift's needs_coverage to false
    SELECT status
    INTO shift_rec
    FROM shift_changes
    WHERE shift_id = shift_id_param;

-- Handle missing record
    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    END IF;

    -- Check if shift not apporved
    IF
        shift_rec.status NOT IN ('approved', 'removed') THEN
        UPDATE shift_changes
        SET status       = 'removed',
            requested_at = NOW()
        WHERE shift_id = shift_id_param;

        UPDATE shifts
        SET needs_coverage = FALSE
        WHERE shift_id = shift_id_param;
    ELSE
        RAISE EXCEPTION 'Shift w/ ID % is approved, cannot be removed', shift_id_param;
    END IF;
    RETURN TRUE;
END;
$$
    LANGUAGE plpgsql;

-- Add user picking up shift for admin approval
CREATE
    OR REPLACE FUNCTION add_covering_id_to_shift_change(
    shift_id_param INT,
    covering_profile_id_param INT
)
    RETURNS BOOLEAN AS
$$
BEGIN -- Change shift status to pending when shift claimed
    UPDATE shift_changes
    SET covering_profile_id = covering_profile_id_param,
        status              = 'pending'
    WHERE shift_id = shift_id_param;
    RETURN TRUE;
END;
$$
    LANGUAGE plpgsql;

-- Add supervisor who approved shift coverage, update with new profile id
CREATE OR REPLACE FUNCTION update_shift_w_profile_ids(
    shift_id_param INT,
    supervisor_id_param INT
)
    RETURNS BOOLEAN AS
$$
DECLARE
    shift_change_rec RECORD;
BEGIN -- Check supervisor privileges, update shift, update needs_coverage to false
    SELECT covering_profile_id, shift_change_id
    INTO shift_change_rec
    FROM shift_changes
    WHERE shift_id = shift_id_param;

-- Handle missing record data
    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    ELSE
        IF shift_change_rec.covering_profile_id IS NULL THEN
            RAISE EXCEPTION 'Shift w/ ID % missing covering profile id', shift_id_param;
        END IF;
        IF
            EXISTS(SELECT 1
                   FROM supervisors
                   WHERE supervisor_id = supervisor_id_param)
        THEN
            UPDATE shift_changes
            SET approved_by_supervisor_id = supervisor_id_param
            WHERE shift_id = shift_id_param;

            UPDATE shifts
            SET assigned_user_id = shift_change_rec.covering_profile_id,
                needs_coverage   = FALSE
            WHERE shift_id = shift_id_param;
            RETURN TRUE;
        ELSE
            RAISE EXCEPTION 'Error updating shift change in shift_change_id %',
                shift_change_rec.shift_change_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Deny requested shift change
CREATE OR REPLACE FUNCTION deny_shift_change(
    shift_id_param INT,
    supervisor_id_param INT
)
    RETURNS BOOLEAN AS
$$
BEGIN
    DECLARE
        shift_change_rec RECORD;
    BEGIN -- Check any missing data, then supervisor privileges, save deny supervisor id and update needs coverage
        SELECT covering_profile_id, shift_change_id
        INTO shift_change_rec
        FROM shift_changes
        WHERE shift_id = shift_id_param;

-- Handle missing records
        IF
            NOT FOUND THEN
            RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
        ELSE
            IF shift_change_rec.covering_profile_id IS NULL THEN
                RAISE EXCEPTION 'Shift w/ ID % missing covering profile id', shift_id_param;
            END IF;
            IF
                EXISTS(SELECT 1
                       FROM supervisors
                       WHERE supervisor_id = supervisor_id_param)
            THEN
                UPDATE shift_changes
                SET denied_by_supervisor_id = supervisor_id_param
                WHERE shift_id = shift_id_param;

                UPDATE shifts
                SET needs_coverage = FALSE
                WHERE shift_id = shift_id_param;
                RETURN TRUE;
            ELSE
                RAISE EXCEPTION 'Error updating shift change in shift_change_id %',
                    shift_change_rec.shift_change_id;
            END IF;
        END IF;
    END;
END;
$$ LANGUAGE plpgsql;

/*
Testing: simulate user pressing give up or removing shift
-- Run query first, then run line with function, then query to see changes
-- Use supabase studio to see the data

SELECT add_shift_to_shift_change(1);    -- Adds shift to shift_changes,
SELECT add_shift_to_shift_change(2,'test 1');
SELECT add_shift_to_shift_change(999);

SELECT shift_owner_removed_shift(1);  -- Changes status to removed
SELECT shift_owner_removed_shift(999);

SELECT add_covering_id_to_shift_change(2,3);
SELECT update_shift_w_profile_ids(2,2); -- Validates ids in previous query, 3 fails, 5 passes

-- Query
SELECT *, convert_pacific_tz(requested_at) AS pacific_time FROM shift_changes;
*/