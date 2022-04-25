// importing Module packge express for use the server
const express = require('express');
// importing module to connect with database
const mysql = require('mysql2');
// Ports
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
  

// Routes goes here
// GET ROUTES ---------------------------------------------------
// View all tables
app.get('/', (req, res) => { 
    const sql = 
    `
    USE employee_tracker;
    SELECT * FROM department;
    SELECT * FROM employee_role;
    SELECT * FROM employee;
    `;
    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows
        });
      });
});
// view all roles,
app.get('/roles', (req, res) => { 
    const sql = 
    `
    SELECT * FROM employee_role;
    `;
    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows
        });
      });

});
// view all employees, 
app.get('/employees', (req, res) => {
    const sql = 
    `
    SELECT * FROM employee;
    `;
    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows
        });
      });
 });
// add a department, 
app.get('/departments', (req, res) => {
    const sql = 
    `
    SELECT * FROM DEPARTMENT;
    `;
    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows
        });
      });    
 });

// POST ROOUTES -----------------------------------------------
// add a role, 
app.post('/role', (req, res) => { 
    // data validation
    const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES (?,?)`;
    const params = [body.title, body.salary, body.department_id]

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body,
          changes: result.affectedRows
        });
      });
});
// add an employee, 
app.post('/employee', (req, res) => { 
    // data validation
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, maager_id]

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body,
          changes: result.affectedRows
        });
      });



});

// PUT ROUTES ------------------------------------------------
// and update an employee role
app.put('/employee', (req, res) => {

    // NEES IMPUT CHECK
    const sql = `UPDATE employee SET role_id = ? where id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Employee not found'
          });
        } else {
          res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
          });
        }
      });



 });


// Ports goes here
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

