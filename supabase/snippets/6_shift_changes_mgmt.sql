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
DROP FUNCTION IF EXISTS get_employee_shifts;
DROP FUNCTION IF EXISTS get_shift_change_by_id;
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
    shift_rec         RECORD;
    shift_change_rec  RECORD;
    updated_shift_rec RECORD;
BEGIN
    shift_rec := get_shift_data(shift_id_param);

    -- Insert shift, then return shift change record
    WITH inserted_shift_change AS (
        INSERT INTO shift_changes (shift_id, og_shift_profile_id, coverage_reason)
            VALUES (shift_rec.shift_id, shift_rec.assigned_user_id, coverage_reason_param)
            RETURNING *)
    SELECT *
    FROM inserted_shift_change
    INTO shift_change_rec;

    -- Update needs coverage in shift table
    WITH updated_shift AS (
        UPDATE shifts
            SET needs_coverage = TRUE,
                shift_change_id = shift_change_rec.shift_change_id
            WHERE shift_id = shift_id_param RETURNING *)
    SELECT *
    FROM updated_shift
    INTO updated_shift_rec;

    RETURN updated_shift_rec;

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
    shift_rec         RECORD;
    shift_change_rec  RECORD;
    updated_shift_rec RECORD;
BEGIN
    shift_rec := get_shift_data(shift_id_param);
    -- Update, change status to removed, and set shift's needs_coverage to false
    SELECT *
    INTO shift_change_rec
    FROM shift_changes
    WHERE (shift_change_id = shift_rec.shift_change_id)
       OR (shift_id = shift_id_param);

    -- Check if shift not approved
    IF
        shift_change_rec.status NOT IN ('approved') THEN
        UPDATE shift_changes
        SET status     = 'removed',
            removed_at = NOW()
        WHERE shift_id = shift_id_param;

        -- Remove shift change id
        UPDATE shifts
        SET shift_change_id = NULL,
            needs_coverage  = FALSE,
            shift_claimed   = FALSE,
            updated_on      = NOW()
        WHERE shift_id = shift_id_param;

        updated_shift_rec := get_shift_data(shift_id_param);
        -- Get updated record details
        RETURN updated_shift_rec;
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
    UPDATE shifts
    SET shift_claimed = TRUE
    WHERE shift_id = shift_id_param;

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
        WHERE shift_change_id = shift_rec.shift_change_id
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
    shift_rec        RECORD;
    shift_change_rec RECORD;
    is_supervisor    BOOLEAN;
BEGIN

    shift_rec := get_shift_data(shift_id_param);

    -- Check supervisor privileges, update shift, update needs_coverage to false
    SELECT *
    INTO shift_change_rec
    FROM shift_changes
    WHERE shift_change_id = shift_rec.shift_change_id;

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
            WHERE shift_change_id = shift_rec.shift_change_id;

            UPDATE shifts
            SET assigned_user_id = shift_change_rec.covering_profile_id,
                needs_coverage   = FALSE,
                shift_claimed    = FALSE,
                shift_change_id  = NULL
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
        shift_rec        RECORD;
    BEGIN -- Check any missing data, then supervisor privileges, save deny supervisor id and update needs coverage
        shift_rec := get_shift_data(shift_id_param);

        SELECT *
        INTO shift_change_rec
        FROM shift_changes
        WHERE shift_change_id = shift_rec.shift_change_id;
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
                SET needs_coverage = FALSE,
                    shift_claimed  = FALSE
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

-- Get shift change details by id
CREATE OR REPLACE FUNCTION get_shift_change_by_id(shift_change_id_param INT)
    RETURNS TABLE
            (
                SHIFT_CHANGE_ID           INTEGER,
                SHIFT_ID                  INTEGER,
                OG_SHIFT_PROFILE_ID       INTEGER,
                OG_EMPLOYEE_NAME          TEXT,
                COVERING_PROFILE_ID       INTEGER,
                COVERING_EMPLOYEE_NAME    TEXT,
                APPROVED_BY_SUPERVISOR_ID INTEGER,
                APPROVING_SUPERVISOR_NAME TEXT,
                DENIED_BY_SUPERVISOR_ID   INTEGER,
                DENYING_SUPERVISOR_NAME   TEXT,
                STATUS                    SHIFT_STATUS,
                COVERAGE_REASON           TEXT,
                REQUESTED_AT              TIMESTAMPTZ,
                DENIED_AT                 TIMESTAMPTZ,
                APPROVED_AT               TIMESTAMPTZ,
                COVERED_AT                TIMESTAMPTZ,
                REMOVED_AT                TIMESTAMPTZ,
                SHIFT_DETAILS             JSON
            )
AS
$$
BEGIN
    RETURN QUERY
        WITH shift_details AS (SELECT s.shift_id,
                                      s.assigned_user_id,
                                      p.name   AS user_name,
                                      s.department_id,
                                      s.supervisor_id,
                                      sup.name AS super_name,
                                      s.shift_name,
                                      s.slot,
                                      s.duration,
                                      s.needs_coverage,
                                      s.coverage_reason,
                                      s.notes,
                                      s.created_on
                               FROM shifts s
                                        INNER JOIN profiles p ON s.assigned_user_id = p.profile_int_id
                                        INNER JOIN supervisors super ON s.supervisor_id = super.supervisor_id
                                        INNER JOIN profiles sup ON super.supervisor_id = sup.profile_int_id)
        SELECT sc.shift_change_id,
               sc.shift_id,
               sc.og_shift_profile_id,
               og_profile.name     AS og_employee_name,
               sc.covering_profile_id,
               covering.name       AS covering_employee_name,
               sc.approved_by_supervisor_id,
               approved_super.name AS approving_supervisor_name,
               sc.denied_by_supervisor_id,
               denied_super.name   AS denying_supervisor_name,
               sc.status,
               sc.coverage_reason,
               sc.requested_at,
               sc.denied_at,
               sc.approved_at,
               sc.covered_at,
               sc.removed_at,
               ROW_TO_JSON(sd.*)   AS shift_details
        FROM shift_changes sc
                 INNER JOIN profiles og_profile ON sc.og_shift_profile_id = og_profile.profile_int_id
                 LEFT JOIN profiles covering ON sc.covering_profile_id = covering.profile_int_id
                 LEFT JOIN supervisors sup_approved ON sc.approved_by_supervisor_id = sup_approved.supervisor_id
                 LEFT JOIN profiles approved_super ON sup_approved.supervisor_id = approved_super.profile_int_id
                 LEFT JOIN supervisors sup_denied ON sc.denied_by_supervisor_id = sup_denied.supervisor_id
                 LEFT JOIN profiles denied_super ON sup_denied.supervisor_id = denied_super.profile_int_id
                 LEFT JOIN shift_details sd ON sc.shift_id = sd.shift_id
        WHERE sc.shift_change_id = shift_change_id_param;
END;
$$ LANGUAGE plpgsql;

-- Get employees shifts and shift change details
CREATE OR REPLACE FUNCTION get_employee_shifts(profile_id_param INT)
    RETURNS TABLE
            (
                SHIFT_ID          INTEGER,
                ASSIGNED_USER_ID  INTEGER,
                PROFILE_NAME      TEXT,
                DEPARTMENT_ID     INTEGER,
                SUPERVISOR_ID     INTEGER,
                SUPER_NAME        TEXT,
                SHIFT_NAME        TEXT,
                SLOT              TSTZRANGE,
                DURATION          INTEGER,
                NEEDS_COVERAGE    BOOLEAN,
                COVERAGE_REASON   TEXT,
                NOTES             TEXT,
                CREATED_ON        TIMESTAMPTZ,
                SHIFT_CHANGE_DATA JSON
            )
AS
$$
BEGIN
    RETURN QUERY
        WITH shift_change_details AS (SELECT s.shift_id,
                                             s.shift_change_id,
                                             s.og_shift_profile_id,
                                             s.covering_profile_id,
                                             s.approved_by_supervisor_id,
                                             s.denied_by_supervisor_id,
                                             s.status,
                                             s.coverage_reason,
                                             s.requested_at,
                                             s.denied_at,
                                             s.approved_at,
                                             s.covered_at,
                                             s.removed_at,
                                             assigned.name       AS og_employee_name,
                                             covering.name       AS covering_employee_name,
                                             approved_super.name AS approving_supervisor_name,
                                             denied_super.name   AS denying_supervisor_name
                                      FROM shift_changes s
                                               INNER JOIN profiles assigned ON s.og_shift_profile_id = assigned.profile_int_id
                                               LEFT JOIN profiles covering
                                                         ON s.covering_profile_id = covering.profile_int_id
                                               LEFT JOIN supervisors sup_approved
                                                         ON s.approved_by_supervisor_id = sup_approved.supervisor_id
                                               LEFT JOIN profiles approved_super
                                                         ON sup_approved.supervisor_id = approved_super.profile_int_id
                                               LEFT JOIN supervisors sup_denied
                                                         ON s.denied_by_supervisor_id = sup_denied.supervisor_id
                                               LEFT JOIN profiles denied_super
                                                         ON sup_denied.supervisor_id = denied_super.profile_int_id)
        SELECT s.shift_id,
               s.assigned_user_id,
               p.name           AS user_name,
               s.department_id,
               s.supervisor_id,
               sup.name         AS super_name,
               s.shift_name,
               s.slot,
               s.duration,
               s.needs_coverage,
               s.coverage_reason,
               s.notes,
               s.created_on,
               ROW_TO_JSON(D.*) AS shift_change_data

        FROM shifts s
                 INNER JOIN profiles p ON s.assigned_user_id = p.profile_int_id
                 INNER JOIN supervisors super ON s.supervisor_id = super.supervisor_id
                 INNER JOIN profiles sup ON super.supervisor_id = sup.profile_int_id
                 LEFT JOIN shift_change_details D ON s.shift_id = D.shift_id
        WHERE s.assigned_user_id = profile_id_param
        ORDER BY s.SLOT;
END;
$$ LANGUAGE plpgsql;

/*
Testing: simulate user pressing give up or removing shift
-- Run query first, then run line with function, then query to see changes
-- Use supabase studio to see the data

SELECT add_shift_to_shift_change(9);    -- Adds shift to shift_changes,
SELECT add_shift_to_shift_change(10,'test 1');
SELECT add_shift_to_shift_change(3,'test 1');
SELECT add_shift_to_shift_change(999);

SELECT shift_owner_removed_shift(9);  -- Changes status to removed
SELECT shift_owner_removed_shift(999);

SELECT add_covering_id_to_shift_change(10,5);
SELECT approve_update_shift_w_profile_ids(10,2); -- Validates ids in previous query, 3 fails, 5 passes

SELECT add_covering_id_to_shift_change(3,5);
SELECT deny_shift_change(3,1);
SELECT * FROM shifts WHERE shift_id = 3;

-- Query
SELECT *, convert_pacific_tz(requested_at) AS pacific_time FROM shift_changes;

SELECT get_employee_shifts(4);
*/