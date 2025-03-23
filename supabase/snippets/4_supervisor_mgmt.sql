/*
-- Create supervisor tables for admins
 - Add functions and triggers to add to this table when role in Profiles changes

** Using profile_int_id instead of profile_id for testing

DROP TABLE IF EXISTS supervisors;
DROP TRIGGER IF EXISTS supervisor_role_change ON profiles;
DROP FUNCTION IF EXISTS add_supervisor();
*/

CREATE TABLE supervisors
(
    supervisor_id INT PRIMARY KEY REFERENCES profiles (profile_int_id) ON DELETE CASCADE,
    department    INT REFERENCES departments (department_id),
    added_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Add supervisor func
CREATE
    OR REPLACE FUNCTION add_supervisor()
    RETURNS TRIGGER AS
$$
BEGIN -- If user not supervisor, add to table w/ new id
    IF
        NEW.role = 'supervisor' AND (OLD.role IS NULL OR OLD.role != 'supervisor') THEN
        INSERT INTO supervisors(supervisor_id)
        VALUES (NEW.profile_int_id)
        ON CONFLICT (supervisor_id) DO NOTHING;
    ELSIF -- If user loses supervisor role, delete from table
        OLD.role = 'supervisor' AND NEW.role != 'supervisor' THEN
        DELETE
        FROM supervisors
        WHERE supervisor_id = NEW.profile_int_id;
    END IF;
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;

-- Create trigger for update
CREATE TRIGGER supervisor_role_change
    AFTER UPDATE OF role
    ON profiles
    FOR EACH ROW
EXECUTE FUNCTION add_supervisor();

-- SELECT * FROM supervisors;