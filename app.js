const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require('figlet');
const cTable = require('console.table');
const view = require('./js/view');
const add = require('./js/add');

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
                view.viewAllEmployees(() => {
                    startProgram();
                });
                break;
            case 'View all roles':
                view.viewAllRoles(() => {
                    startProgram();
                });
                break;
            case 'View all departments':
                view.viewAllDepartments(() => {
                    startProgram();
                });
                break;
            case 'Add department':
                add.addDepartment(() => {
                    startProgram();
                });
                break;
            case 'Add role':
                add.addRole(() => {
                    startProgram();
                });
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