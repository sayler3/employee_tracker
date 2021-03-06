const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

module.exports = {
	viewAllEmployees: function (callBack) {
		connection.query(
			'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department, concat(manager.first_name, " ", manager.last_name) as Manager \
            FROM employee as employee INNER JOIN role as role on employee.role_id = role.id \
            INNER JOIN department as department ON role.department_id = department.id \
            LEFT JOIN employee as manager on employee.manager_id = manager.id ORDER BY employee.id;',
			(err, results) => {
				if (err) throw err;
				console.table(results);
				callBack(results);
			}
		);
	},

	viewAllRoles: function (callBack) {
		connection.query("SELECT * FROM role", (err, results) => {
			if (err) throw err;
			console.table(results);
			callBack(results);
		});
	},

	viewAllDepartments: function (callBack) {
		connection.query("SELECT * FROM department", (err, results) => {
			if (err) throw err;
			console.table(results);
			callBack(results);
		});
	},

	viewDepartmentBudget: function (dList, callBack) {
		inquirer
			.prompt([
				{
					name: "curDept",
					type: "list",
					choices: dList,
					message: "Select a department:",
				},
			])
			.then((answers) => {
				let dP = answers.curDept.split(" ");
				let dp = dP[1];

				connection.query(
					"SELECT SUM(role.salary) AS Total, department.name as Department\
                    FROM employee as employee INNER JOIN role as role on employee.role_id = role.id\
                    INNER JOIN department as department ON role.department_id = department.id\
                    LEFT JOIN employee as manager on employee.manager_id = manager.id where department.name = ?",
					[dp],
					(err, results) => {
						if (err) throw err;
						console.table(results);
						callBack(results);
					}
				);
			});
	},
};
