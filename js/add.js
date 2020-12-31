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

	addEmployee: function (firstName, lastName, roleId, managerId, callBack) {
		connection.query(
			"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
			[firstName, lastName, roleId, managerId],
			(err, res) => {
				if (err) throw err;
				console.log("A new employee has been added to the database! \n");
				callBack(res);
			}
		);
	},
};
