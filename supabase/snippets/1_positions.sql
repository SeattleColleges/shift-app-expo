/*
Create Position table

DROP TABLE IF EXISTS positions;
*/

CREATE TABLE positions
(
    position_id   SERIAL PRIMARY KEY,
    position_name TEXT,
    position_desc TEXT,
    created_on    TIMESTAMPTZ DEFAULT now()
);

INSERT INTO positions(position_name, position_desc)
VALUES ('AD Tutor', 'Help other students learn the subject material....')
     , ('Teacher Assistant', 'Teachers aid...')
     , ('Food Court Cashier', 'Help monitor self-checkout...');

/*
--Query

SELECT * FROM positions;
*/
