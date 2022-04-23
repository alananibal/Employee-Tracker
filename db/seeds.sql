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
    (title, salary, department_id)
VALUES
    ('Fulano', 'Da Silva Saurus', 1, 3),
    ('Cicrano', 'Van Schudruts', 2, 3),
    ('Jojo', 'Ma', 3, 9);


