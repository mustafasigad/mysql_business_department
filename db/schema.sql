DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

-- parent table 
CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- common col
  name VARCHAR(30)
);
-- child table creation 
CREATE TABLE role (
    rol_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title  VARCHAR(30) NOT NULL ,
    salary DECIMAL NOT NULL ,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES department(dept_id)
    ON DELETE SET NULL
);
-- child table creation for employee 
CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL ,
    last_name  VARCHAR(30) NOT NULL ,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(rol_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
    ON DELETE SET NULL
);



