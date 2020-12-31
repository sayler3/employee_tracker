const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

module.exports = {
	addDepartment: function (newDept, callBack) {
		// inquirer
		// 	.prompt({
		// 		name: "newDept",
		// 		type: "input",
		// 		message: "What is the name of the department you would like to add?",
		// 	})
		// 	.then(({ newDept }) => {
				connection.query(
					"INSERT INTO department (name) VALUES (?);",
					newDept,
					(err, res) => {
						if (err) throw err;
						console.log("Department has been added! \n");
						callBack(res);
					}
				);
			// });
	},

	addRole: function (title, salary, DI, callBack) {
		inquirer
			.prompt([
				{
					name: "title",
					type: "input",
					message: "What is the title of the new role ?",
				},
				{
					name: "salary",
					type: "number",
					message: "What is the new salary of the new role ?",
				},
				{
					name: "departmentId",
					type: "input",
					message: "Department Id for new role ?",
				}
            ])
			.then((answers) => {
				connection.query(
					"INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
					[answers.title, answers.salary, answers.departmentId],
					(err, res) => {
						if (err) throw err;
						console.log("role has been added to database! \n");
						callBack(res);
					}
				);
			});
	},
};
