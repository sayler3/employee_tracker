// const viewAllEmployees = () => {
    // connection.query('SELECT * FROM employee', (err, results) => {
    //     if (err) throw err;
    //     console.table(results)
    //     startProgram();
    // });
// };

// const viewAllRoles = () => {
//     connection.query('SELECT * FROM role', (err, results) => {
//         if (err) throw err;
//         console.table(results)
//         startProgram();
//     });
// };

// const viewAllDepartments = () => {
//     connection.query('SELECT * FROM department', (err, results) => {
//         if (err) throw err;
//         console.table(results)
//         startProgram();
//     });
// };

// module.exports = { viewAllEmployees, viewAllRoles, viewAllDepartments };
const mysql = require("mysql");
const cTable = require('console.table');

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

module.exports = {
    viewAllEmployees: function (callBack) {
        connection.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            console.table(results)
            callBack();
        });
    }
}