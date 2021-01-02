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
	addDepartment: function (newDept, callBack) {
		connection.query(
			"INSERT INTO department (name) VALUES (?);",
			newDept,
			(err, res) => {
				if (err) throw err;
				console.log("Department has been added! \n");
				callBack(res);
			}
		);
	},

	addRole: function (title, salary, departmentId, callBack) {
		connection.query(
			"INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
			[title, salary, departmentId],
			(err, res) => {
				if (err) throw err;
				console.log("role has been added to database! \n");
				callBack(res);
			}
		);
	},

	addEmp: function (rTitle, eManager, callBack) {
		inquirer.prompt([
			{
				name: "firstName",
				type: "input",
				message: "Enter first name:",
			},
			{
				name: "lastName",
				type: "input",
				message: "Enter last name:",
			},
			{
				name: "roleId",
				type: "list",
				choices: rTitle,
				message: "Select a role:",
			},
			{
				name: "managerId",
				type: "list",
				choices: eManager,
				message: "Select a Manager",
			},
		])
			.then((answers) => {
				// Storing for later use
				let fN = answers.firstName;
				let lN = answers.lastName;
				let roleTitle = answers.roleId.split(" ");
				let rT = roleTitle[0];
				let mName = answers.managerId;
				let manId = answers.managerId.split(" ");
				let mId = manId[0];

				if (mName === "none") {
					mName = null;
				}else {
					mName = mId;
				}

				connection.query(
					"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
					[fN, lN, rT, mName],
					(err, res) => {
						if (err) throw err;
						console.log("A new employee has been added to the database! \n");
						callBack(res);
					}
				);
			});
	},
};
