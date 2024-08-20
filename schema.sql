DROP DATABASE acme_hr_directory_db;
CREATE DATABASE acme_hr_directory_db;

\c acme_hr_directory_db;

CREATE TABLE department (id SERIAL PRIMARY KEY,name TEXT);

CREATE TABLE employee (id SERIAL PRIMARY KEY,name TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, department_id INTEGER);

INSERT INTO department(name)
VALUES ('Business Management'), ('Engineering'), ('Supply Chain'), ('Finance');

INSERT INTO employee(name, department_id)
VALUES ('Jim', 1), ('Sam', 3), ('Ashley', 2), ('Kelly', 4), 
('Bre', 1), ('Eric', 3), ('John', 4), ('Susan', 2);