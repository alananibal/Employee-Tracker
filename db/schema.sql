DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS department;

-- DEPARTMENT   
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);
-- ROLE
CREATE TABLE employee_role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL
);
-- EMPLOYEE
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,

    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_role(id) 
    ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
    
);
