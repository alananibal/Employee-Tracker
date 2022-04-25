const { response } = require('express');
const fs = require('fs');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const mysql = require('mysql2');
require('console.table');

var employeeArray = " ";

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'T@ti28Al@n18',
    database: 'employee_tracker'
  },
  console.log('Connected to the election database.')  
);



const userOptions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do? ',
            choices: [
                'View all the departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role'
            ],
            
        },

    ])
    .then(response => {
        if (response.choices === 'View all the departments') {
           showDepartments(); 
        }
        if (response.choices === 'View all roles') {
            showRoles();
        }
        if (response.choices === 'View all employees') {
            showEmployees();
        }
        if (response.choices === 'Add a department') {
            addDepartment();
        }
        if (response.choices === 'Add a role') {
            addRole();
        }
        if (response.choices === 'Add an employee') {
            addEmployee();
        }
        if (response.choices === 'Update employee role') {
            updateRole();
        }
    });

};

// VIEWS------------------------------------------------
const showDepartments = () => {
    db.query('SELECT * FROM department;', (err, data)=>{
        console.table(data);
        userOptions();
    })
}
const showRoles = () => {
    db.query('SELECT * FROM employee_role;', (err, data)=>{
        console.table(data);
        userOptions();
    })
}
const showEmployees = () => {
    db.query('SELECT * FROM employee;', (err, data)=>{
        console.table(data);
        userOptions();
    })
}

// Adds---------------------------------------------------
const addDepartment = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name: "title",
            message: 'what is the name of the department?'
        }
    ])
    .then(response => {
        db.query(`INSERT INTO department (department_name) VALUES (?)`, [response.title], (err) => {
            showDepartments();
        })
    })
};
const addRole = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name: "title",
            message: 'what is the title of the role?'
        },
        {
            type: 'input',
            name: "salary",
            message: 'what is the salary of the role?'
        },
        {
            type: 'input',
            name: "department_id",
            message: 'which department does the role belongs to?'
        },
    ])
    .then(response => {
        db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)`, 
        [response.title, response.salary, response.department_id], (err) => {showRoles();}
        )
    })
}
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: "first_name",
            message: 'what is the employee  first name?'
        },
        {
            type: 'input',
            name: "last_name",
            message: 'what is the employee last name?'
        },
        {
            type: 'input',
            name: "role_id",
            message: 'what is the employee\'s role id?'
        },
        {
            type: 'input',
            name: "manager_id",
            message: 'Who is the employee\'s manager id?'
        },

    ])
    .then(response => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
        [response.first_name, response.last_name, response.role_id, response.manager_id], (err) => {
            showEmployees();
        })
    })
}

// UPDATES-----------------------------------------
const updateRole = () => {
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Which Employee would you like to update?(please inform his/hers id) ',
        },
        {
            type: 'input',
            name: "role_id",
            message: 'what is the employee\'s new role id?',
        }
    ])
    .then(response => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
        [response.role_id, response.id], (err) => {
            showEmployees();
        })
    })
}

var getEmployeeList = () => {
    const sql = 'SELECT CONCAT (first_name, " ", last_name) AS Name FROM employee;'
    db.query(sql, (err, data) => {
        console.log(data)
       if (err) throw err;
       

       employeeArray = data;
       console.log(employeeArray)

        // userOptions();
    })
    
   

}

//  updateRole();
// getEmployeeList();

userOptions();

