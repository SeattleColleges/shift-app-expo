/*
-- Create shift changes table
- Handle user adding shift to shift_change table
- Handle user no longer wanting to give up shift
- Handle swapping user ids once approved by supervisor

- Serial used for testing, will be UUID so each shift_change ID will be unique
// Enum order matters: (0,1,2,3)

DROP TABLE IF EXISTS shift_changes;
DROP TYPE IF EXISTS SHIFT_STATUS;
DROP FUNCTION IF EXISTS is_supervisor;
DROP FUNCTION IF EXISTS add_shift_to_shift_change;
DROP FUNCTION IF EXISTS shift_owner_removed_shift;
DROP FUNCTION IF EXISTS add_covering_id_to_shift_change;
DROP FUNCTION IF EXISTS approve_update_shift_w_profile_ids;
DROP FUNCTION IF EXISTS deny_shift_change;
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
    requested_at              TIMESTAMPTZ           DEFAULT NOW(),
    denied_at                 TIMESTAMPTZ,
    approved_at               TIMESTAMPTZ,
    covered_at                TIMESTAMPTZ,
    removed_at                TIMESTAMPTZ
);

-- Get shift data based of shift_id
CREATE OR REPLACE FUNCTION get_shift_data(shift_id_param INT) RETURNS RECORD AS
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
    RETURN shift_rec;
END;
$$ LANGUAGE plpgsql;

-- Check role
CREATE OR REPLACE FUNCTION is_supervisor(supervisor_id_param INT) RETURNS BOOLEAN AS
$$
DECLARE
    verified BOOLEAN;
BEGIN
    verified := EXISTS(SELECT 1
                       FROM supervisors
                       WHERE supervisor_id = supervisor_id_param);
    RETURN verified;
END;
$$ LANGUAGE plpgsql;

-- Add shifts to shift_changes table
CREATE OR REPLACE FUNCTION add_shift_to_shift_change(
    shift_id_param INT,
    coverage_reason_param TEXT DEFAULT 'No reason provided'
)
    RETURNS RECORD AS
$$
DECLARE
    shift_rec        RECORD;
    shift_change_rec RECORD;
BEGIN
    shift_rec := get_shift_data(shift_id_param);
    -- Update needs coverage in shift table
    UPDATE shifts
    SET needs_coverage = TRUE
    WHERE shift_id = shift_id_param;

    -- Insert shift, then return shift change record
    WITH inserted_shift_change AS (
        INSERT INTO shift_changes (shift_id, og_shift_profile_id, coverage_reason)
            VALUES (shift_rec.shift_id, shift_rec.assigned_user_id, coverage_reason_param)
            RETURNING *)
    SELECT *
    FROM inserted_shift_change
    INTO shift_change_rec;

    RETURN shift_change_rec;
-- Handle errors, returns to func caller
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;
$$
    LANGUAGE plpgsql;

-- Handles case if shift owner changing their mind
CREATE OR REPLACE FUNCTION shift_owner_removed_shift(shift_id_param INT) RETURNS RECORD AS
$$
DECLARE
    shift_change_rec         RECORD;
    updated_shift_change_rec RECORD;
BEGIN
    -- Update, change status to removed, and set shift's needs_coverage to false
    SELECT *
    INTO shift_change_rec
    FROM shift_changes
    WHERE shift_id = shift_id_param;

    -- Check if shift not approved
    IF
        shift_change_rec.status NOT IN ('approved', 'removed') THEN
        UPDATE shift_changes
        SET status     = 'removed',
            removed_at = NOW()
        WHERE shift_id = shift_id_param
        RETURNING * INTO updated_shift_change_rec;

        UPDATE shifts
        SET needs_coverage = FALSE
        WHERE shift_id = shift_id_param;

        RETURN updated_shift_change_rec;
    ELSE
        RAISE EXCEPTION 'Shift w/ ID % is approved, cannot be removed', shift_id_param;
    END IF;
END;
$$
    LANGUAGE plpgsql;

-- Add user picking up shift for admin approval
CREATE OR REPLACE FUNCTION add_covering_id_to_shift_change(
    shift_id_param INT,
    covering_profile_id_param INT
)
    RETURNS RECORD AS
$$
DECLARE
    shift_rec        RECORD;
    has_conflict     BOOLEAN;
    shift_change_rec RECORD;
BEGIN -- Check for shift conflicts before changing shift status to pending when shift claimed
    shift_rec := get_shift_data(shift_id_param);

    has_conflict := EXISTS(SELECT 1
                           FROM shifts
                           WHERE assigned_user_id = covering_profile_id_param
                             AND slot && shift_rec.slot);
    IF NOT has_conflict THEN
        UPDATE shift_changes
        SET covering_profile_id = covering_profile_id_param,
            status              = 'pending',
            covered_at          = NOW()
        WHERE shift_id = shift_id_param
        RETURNING * INTO shift_change_rec;

        RETURN shift_change_rec;
    ELSE
        RAISE EXCEPTION 'Cannot pick up shift - schedule conflicts with existing shift';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Add supervisor who approved shift coverage, update with new profile id
CREATE OR REPLACE FUNCTION approve_update_shift_w_profile_ids(
    shift_id_param INT,
    supervisor_id_param INT
)
    RETURNS RECORD AS
$$
DECLARE
    shift_change_rec RECORD;
    is_supervisor    BOOLEAN;
BEGIN -- Check supervisor privileges, update shift, update needs_coverage to false
    SELECT *
    INTO shift_change_rec
    FROM shift_changes
    WHERE shift_id = shift_id_param;

    -- Handle missing record data
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    ELSE
        IF shift_change_rec.covering_profile_id IS NULL THEN
            RAISE EXCEPTION 'Shift w/ ID % missing covering profile id', shift_id_param;
        END IF;

        is_supervisor := is_supervisor(supervisor_id_param);
        IF
            is_supervisor THEN
            UPDATE shift_changes
            SET approved_by_supervisor_id = supervisor_id_param,
                status                    = 'approved'
            WHERE shift_id = shift_id_param;

            UPDATE shifts
            SET assigned_user_id = shift_change_rec.covering_profile_id,
                needs_coverage   = FALSE
            WHERE shift_id = shift_id_param
            RETURNING * INTO shift_change_rec;
            RETURN shift_change_rec;
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
    RETURNS RECORD AS
$$
BEGIN
    DECLARE
        shift_change_rec RECORD;
        is_supervisor    BOOLEAN;
    BEGIN -- Check any missing data, then supervisor privileges, save deny supervisor id and update needs coverage
        SELECT *
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

            is_supervisor = is_supervisor(supervisor_id_param);
            IF is_supervisor THEN -- Deny shift, log denier
                UPDATE shift_changes
                SET denied_by_supervisor_id = supervisor_id_param,
                    status                  = 'denied',
                    denied_at               = NOW()
                WHERE shift_id = shift_id_param
                RETURNING * INTO shift_change_rec;

                -- Update needs coverage
                UPDATE shifts
                SET needs_coverage = FALSE
                WHERE shift_id = shift_id_param;

                RETURN shift_change_rec;
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
SELECT add_shift_to_shift_change(3,'test 1');
SELECT add_shift_to_shift_change(999);

SELECT shift_owner_removed_shift(1);  -- Changes status to removed
SELECT shift_owner_removed_shift(999);

SELECT add_covering_id_to_shift_change(2,5);
SELECT approve_update_shift_w_profile_ids(2,2); -- Validates ids in previous query, 3 fails, 5 passes

SELECT add_covering_id_to_shift_change(3,5);
SELECT deny_shift_change(3,1);
SELECT * FROM shifts WHERE shift_id = 3;

-- Query
SELECT *, convert_pacific_tz(requested_at) AS pacific_time FROM shift_changes;
*/