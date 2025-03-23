/*
Create an departement table
- Using bigint for testing, eventually the type will be a foreign key

DROP TABLE IF EXISTS departments;
*/

CREATE TABLE departments
(
    department_id   SERIAL PRIMARY KEY,
    department_name TEXT,
    department_desc TEXT,
    created_on      TIMESTAMPTZ DEFAULT now()
);

INSERT INTO departments(department_name, department_desc)
VALUES ('App Dev Tutoring service', 'Offering tutoring serices to app development students')
     , ('Computer Science Tutoring service', 'Offering tutoring serices to app development students');

-- SELECT * FROM departments;