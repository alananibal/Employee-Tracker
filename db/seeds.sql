INSERT INTO department
    (department_name)
VALUES
    ('Front_End_Developers'),
    ('Back_End_Developers'),
    ('Adminitration');

INSERT INTO employee_role
    (title, salary, department_id)
VALUES
-- FD
    ('intern', '60000', 1 ),
    ('enginer', "120000", 1),
    ('manager', "200000", 1),
-- BD
    ('intern', '60000', 2 ),
    ('enginer', "120000", 2),
    ('manager', "200000", 1),
-- ADM
    ('secretary', '80000', 3),
    ('CEO', '1000000', 3);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('Fulano', 'Da Silva Saurus', 1),
    ('Cicrano', 'Van Schudruts', 2 ),
    ('Jojo', 'Ma', 3);


UPDATE employee SET manager_id = 3 where id = 1;


