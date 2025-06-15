/*
Create shift table
- use tstzrange to handle shift's time slot
  - exclude the end of shift to allow subsequent shifts
- only future shifts can be entered
- no overlaps between shifts for an assigned user

Notes:
- INT used for testing purposes. assigned_userid will eventually use uuid. btree_gist extension will be dropped
- Serial used for testing, will be UUID so each shift ID will be unique

(Error code): message
- Violation when user tries to add overlapping shifts to their schedule
  - (23P01): conflicting key value violates exclusion constraint "shift_assigned_userid_slot_excl"
- Violation when user tries to add a shift before the current time
  - (23514): new row for relation "shift" violates check constraint "shift_slot_check"

DROP TABLE IF EXISTS shifts;
DROP FUNCTION IF EXISTS add_shift_to_shifts_table;
*/

CREATE
    EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE shifts
(
    shift_id         SERIAL PRIMARY KEY,
    assigned_user_id INT REFERENCES profiles (profile_int_id),
    department_id    INT REFERENCES departments (department_id),
    supervisor_id    INT REFERENCES supervisors (supervisor_id),
    shift_name       TEXT,
    slot             TSTZRANGE NOT NULL CHECK (
        LOWER(slot) > NOW()
        ),
    duration         INT GENERATED ALWAYS AS (
        EXTRACT(EPOCH FROM UPPER(slot) - LOWER(slot)) / 60
        ) STORED,

    needs_coverage   BOOLEAN     DEFAULT FALSE,
    shift_claimed    BOOLEAN     DEFAULT FALSE,
    coverage_reason  TEXT,
    notes            TEXT,
    shift_change_id  INT,
    created_on       TIMESTAMPTZ DEFAULT NOW(),
    updated_on       TIMESTAMPTZ,
    EXCLUDE USING gist (assigned_user_id WITH =,slot WITH &&)
);
/*
-- Dummy data

INSERT INTO shifts (shift_name, assigned_user_id, slot, department_id, supervisor_id)
VALUES ('Morning shift A', 3, TSTZRANGE('2025-07-11 08:00:00+00', '2025-07-11 12:00:00+00', '[)'), 1, 1),
       ('Morning shift B', 4, TSTZRANGE('2025-07-11 08:00:00+00', '2025-07-11 12:00:00+00', '[)'), 1, 1),
       ('Afternoon shift A', 3, TSTZRANGE('2025-07-12 13:00:00+00', '2025-07-12 17:00:00+00', '[)'), 1, 1),
       ('Afternoon shift B', 4, TSTZRANGE('2025-07-12 13:00:00+00', '2025-07-12 17:00:00+00', '[)'), 1, 1),
       ('Evening shift A', 3, TSTZRANGE('2025-07-13 18:00:00+00', '2025-07-13 22:00:00+00', '[)'), 1, 1),
       ('Evening shift B', 4, TSTZRANGE('2025-07-13 18:00:00+00', '2025-07-13 22:00:00+00', '[)'), 1, 1),
       ('Night shift A', 3, TSTZRANGE('2025-07-14 23:00:00+00', '2025-07-15 07:00:00+00', '[)'), 1, 2),
       ('Night shift B', 4, TSTZRANGE('2025-07-14 23:00:00+00', '2025-07-15 07:00:00+00', '[)'), 1, 2);
*/

-- Add shift func
CREATE OR REPLACE FUNCTION add_shift_to_shifts_table(
    shift_name_param TEXT,
    assigned_user_id_param INT,
    start_time_param TEXT,
    end_time_param TEXT,
    department_id_param INT,
    supervisor_id_param INT
) RETURNS SHIFTS AS
$$
DECLARE
    inserted_shift_rec SHIFTS %ROWTYPE;
BEGIN
    -- Prepare data for insertion
    INSERT INTO shifts (shift_name, assigned_user_id, slot, department_id, supervisor_id)
    VALUES (shift_name_param, assigned_user_id_param, TSTZRANGE(start_time_param::timestamptz, end_time_param::timestamptz, '[)'), -- [) startTime inclusive and endTime exclusive slot
            department_id_param, supervisor_id_param)
    RETURNING * INTO inserted_shift_rec;

    RETURN inserted_shift_rec;
END;
$$ LANGUAGE plpgsql;

/*
-- Query
SELECT S.*
,P.name
,D.department_name as d_name
--id, name, assigned_userid , slot, duration, lower(slot) as start_time, upper(slot) as end_time
FROM shifts S
INNER JOIN Profiles P ON S.assigned_user_id = P.profile_int_id
INNER JOIN departments D ON S.department_id = D.department_id
 --WHERE assigned_userid = 2
ORDER BY shift_id;

*/