const inquirer = require('inquirer');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const { questions, updatetable } = require('./questions')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Nasra@2013',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);
async function init() {
  const answer = await inquirer.prompt(questions);

  switch (answer.choice) {
    case 'View all departments':
      //updatetable()
      db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
      });
      break;

    case 'View all roles':
     
      db.query('SELECT * FROM role ', function (err, results) {
        console.table(results);
      });
      break;

    case 'View all employees':
      
      db.query('SELECT * FROM employee ', function (err, results) {
        console.table(results);
      });
      break;
  
  case 'Add a department':
        inquirer.prompt([
          {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department:',
          },
        ]).then((answer) => {
            db.query(`INSERT INTO department (name) VALUES ('${answer.department}') `, function (err, results) {
            console.log("department added to the table");
          })
        });

        break;
      case 'Add a role':
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter job title :',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter salary :',
          },
          {
            type: 'input',
            name: 'dept',
            message: 'Enter department id :',
          },

        ]).then((answer) => {
            db.query(`INSERT INTO role (title,salary,dept_id) VALUES ('${answer.title}','${answer.salary}',${answer.dept}) `, function (err, results) {
            console.log("new role added ");
          })
        });

        break;

      case 'Add an employee':
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstname',
            message: 'Enter first name :',
          },
          {
            type: 'input',
            name: 'lastname',
            message: 'Enter last name :',
          },
          {
            type: 'input',
            name: 'role_id',
            message: 'Enter Role id :',
          },
          {
            type: 'input',
            name: 'manager_id',
            message: 'Enter Manager id :',
          },
        ]).then((answer) => {
          // only manager_id is not  parse as string to allow NULL
          db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('${answer.firstname}','${answer.lastname}',${answer.role_id},${answer.manager_id}) `, function (err, results) {
            console.log("Employee added to the table");
          })
        });

        break;

      case 'Update an employee role':
        inquirer.prompt([
          {
            type: 'input',
            name: 'role',
            message: 'Enter new role id :',
          },
          {
            type: 'input',
            name: 'employee_id',
            message: 'Enter employee id :',
          },
        ]).then((answer) => {
          // only manager_id is not  parse as string to allow NULL
          db.query(`UPDATE employee SET role_id= ${answer.role} WHERE employee_id=${answer.employee_id}`, function (err, results) {
            console.log("Employee added to the table");
                      })
        });
    }
  };


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
init();