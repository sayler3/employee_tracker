const mysql = require("mysql");
const inquirer = require("inquirer");

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
