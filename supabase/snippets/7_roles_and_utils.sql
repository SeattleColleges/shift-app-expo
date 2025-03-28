/*
Roles, Permissions, and Policies
- Create employee, supervisor, admin roles
- users can read, update, delete in the shift table

Note:
- RLS and policies will be implemented once we are close to alpha testing

DROP ROLE IF EXISTS shift_supervisor;
DROP ROLE IF EXISTS shift_employee;
DROP ROLE IF EXISTS shift_admin;

-- Roles
CREATE ROLE IF NOT EXISTS shift_supervisor;
CREATE ROLE IF NOT EXISTS shift_employee;
CREATE ROLE IF NOT EXISTS shift_admin;

-- Permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON shifts TO shift_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON shifts TO shift_supervisor;
GRANT SELECT, INSERT, UPDATE, DELETE ON shifts TO shift_employee;
*/
/* RLS will be enabled last
-- Policies -- Enable RLS first before running policies
ALTER TABLE shift enable ROW LEVEL SECURITY;

--Debug code
SELECT *
--rolname
FROM pg_roles WHERE rolname LIKE 'shift_%';

SELECT current_user;

SELECT *
--schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'shifts';
*/

/*
Utility functions
- All timezone stamps are set to UTC
*/
CREATE OR REPLACE FUNCTION convert_pacific_tz(time_param TIMESTAMPTZ)
    RETURNS TIMESTAMPTZ AS
$$
BEGIN
    RETURN time_param AT TIME ZONE 'America/Los_Angeles';
END;
$$ LANGUAGE plpgsql;