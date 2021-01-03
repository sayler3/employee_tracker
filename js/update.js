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
	updateEmpRole: function (eName, rName, callBack) {
		inquirer
			.prompt([
				{
					name: "selectEmployee",
					type: "list",
					choices: eName,
					message: "Choose the employee whos role needs to be updated:",
				},
				{
					name: "newRole",
					type: "list",
					choices: rName,
					message: "Choose the new role for the selected empoyee:",
				},
			])
			.then((answers) => {
				// Storing id's for later use
				let employeeID = answers.selectEmployee.split(" ");
				let eID = employeeID[0];
				let roleId = answers.newRole.split(" ");
				let rID = roleId[0];

				connection.query(
					"UPDATE employee SET role_id = ? WHERE id = ?;",
					[rID, eID],
					(err, results) => {
						if (err) throw err;
						console.log("New role has been updated!");
						callBack(results);
					}
				);
			});
	},

	updateEmpManager: function (empName, mName, callBack) {
		inquirer
			.prompt([
				{
					name: "selectEmployee",
					type: "list",
					choices: empName,
					message: "Choose the employee whos manager needs to be updated:",
				},
				{
					name: "selectManager",
					type: "list",
					choices: mName,
					message: "Choose a new manager for the selected empoyee:",
				},
			])
			.then((answers) => {
				// Storing id's for later use
                let employeeID = answers.selectEmployee.split(" ");
                let managerID = answers.selectManager.split(" ");
                let mN = answers.selectManager;
				let eID = employeeID[0];
                let mID = managerID[0];
                
                if (mN === "no manager") {
					mN = null;
				}else {
					mN = mID;
				}

				connection.query(
					"UPDATE employee SET manager_id = ? WHERE id = ?;",
					[mN, eID],
					(err, results) => {
						if (err) throw err;
						console.log("New manager has been updated!");
						callBack(results);
					}
				);
			});
	},
};
