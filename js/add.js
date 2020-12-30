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
		inquirer
			.prompt({
				name: "newDept",
				type: "input",
				message: "What is the name of the department you would like to add?",
			})
			.then(({ newDept }) => {
				connection.query(
					"INSERT INTO department (name) VALUES (?);",
					newDept,
					(err, res) => {
						if (err) throw err;
						console.log("Department has been added! \n");
						callBack(res);
					}
				);
			});
	},
};
