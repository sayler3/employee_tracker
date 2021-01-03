const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

module.exports = {
	deleteEmp: function (eeName, callBack) {
		inquirer
			.prompt([
				{
					name: "selectEmp",
					type: "list",
					choices: eeName,
					message: "Select the employee that needs to be removed:",
				},
			])
			.then((answers) => {
				// Storing id's for later use
				let employeeID = answers.selectEmp.split(" ");
				let eID = employeeID[0];

				connection.query(
					"DELETE FROM employee WHERE id = ?;",
					[eID],
					(err, results) => {
						if (err) throw err;
						console.log("Employee has been deleted!");
						callBack(results);
					}
				);
			});
	},

	deleteRole: function (rrName, callBack) {
		inquirer
			.prompt([
				{
					name: "selectR",
					type: "list",
					choices: rrName,
					message: "Select the Role that needs to be removed:",
				},
			])
			.then((answers) => {
				let roleId = answers.selectR.split(" ");
				let rID = roleId[0];

				connection.query(
					"DELETE FROM role WHERE id = ?;",
					[rID],
					(err, results) => {
						if (err) throw err;
						console.log("Role has been deleted!");
						callBack(results);
					}
				);
			});
	},

	deleteDept: function (dName, callBack) {
		inquirer
			.prompt([
				{
					name: "selectD",
					type: "list",
					choices: dName,
					message: "Select the department that needs to be removed:",
				},
			])
			.then((answers) => {
				let deptId = answers.selectD.split(" ");
				let dID = deptId[0];

				connection.query(
					"DELETE FROM department WHERE id = ?;",
					[dID],
					(err, results) => {
						if (err) throw err;
						console.log("Department has been deleted!");
						callBack(results);
					}
				);
			});
	},
};
