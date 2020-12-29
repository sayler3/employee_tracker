const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require('figlet');
const { viewAllEmployees } = require('./js/view');

//Starting connection to mysql
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log(figlet.textSync('Employee Manager', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 60,
        whitespaceBreak: true
    }));
	startProgram();
});

const startProgram = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all roles',
            'View all departments',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'EXIT',
        ],
    })
    .then(({ action }) => {
        console.log(action);
        switch (action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all roles':
                
                break;
            case 'View all departments':
                
                break;
            case 'Add department':
                
                break;
            case 'Add role':
                
                break;
            case 'Add employee':
                
                break;
            case 'Update employee role':
                
                    break;
            default:
                connection.end();
                process.exit(0);
                break;
        }
    });
};

// const viewAllEmployees = () => {
//     connection.query('SELECT * FROM employee', (err, results) => {
//         if (err) throw err;
//         console.table(results)
//         startProgram();
//     });
// };