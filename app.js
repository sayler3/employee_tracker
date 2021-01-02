const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");
const view = require("./js/view");
const add = require("./js/add");
const update = require("./js/update");
const questions = require("./js/questions");

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
	console.log(
		// Banner art for start of app
		figlet.textSync("Employee Manager", {
			font: "Standard",
			horizontalLayout: "default",
			verticalLayout: "default",
			width: 60,
			whitespaceBreak: true,
		})
	);
	startProgram();
});

// Varibles for arrays that hold data to be used later
let listEmploy = [];
let listRole = [];

// Functions to get data for storage in varible
const getEmployees = () => {
	connection.query("SELECT * FROM employee;", (err, results) => {
		if (err) throw err;
		results.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
			listEmploy.push({ id, first_name, last_name, role_id, manager_id });
		});
	});
};
getEmployees();

const getRoles = () => {
	connection.query("SELECT * FROM role;", (err, results) => {
		if (err) throw err;
		results.forEach(({ id, title, salary, department_id }) => {
			listRole.push({ id, title, salary, department_id });
		});
	});
};
getRoles();

// Start of program run
const startProgram = () => {
	inquirer.prompt(questions.startMenu).then(({ action }) => {
		console.log(action);
		switch (action) {
			case "View all employees":
				view.viewAllEmployees(() => {
					startProgram();
				});
				break;
			case "View all roles":
				view.viewAllRoles(() => {
					startProgram();
				});
				break;
			case "View all departments":
				view.viewAllDepartments(() => {
					startProgram();
				});
				break;
			case "Add department":
				inquirer.prompt(questions.addDepartmentName).then(({ newDept }) => {
					add.addDepartment(newDept, () => {
						startProgram();
					});
				});
				break;
			case "Add role":
				inquirer.prompt(questions.addNewRole).then((answers) => {
					add.addRole(
						answers.title,
						answers.salary,
						answers.departmentId,
						() => {
							startProgram();
						}
					);
				});
				break;
			case "Add employee":
				inquirer.prompt(questions.addNewEmployee).then((answers) => {
					add.addEmployee(
						answers.firstName,
						answers.lastName,
						answers.roleId,
						answers.managerId,
						() => {
							startProgram();
						}
					);
				});
				break;
			case "Update employee role":
				// Storing employee and role information to use for inquirer choices
				let eName = [];
				let rName = [];

				listEmploy.forEach(({ id, first_name, last_name }) => {
					eName.push(id + " " + first_name + " " + last_name);
				});
				listRole.forEach(({ id, title }) => {
					rName.push(id + " " + title);
				});

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
							message: "What is the new role for the selected empoyee ?",
						},
					])
					.then((answers) => {
						// Storing id's for later use
						let employeeID = answers.selectEmployee.split(" ");
						let eID = employeeID[0];
						let roleId = answers.newRole.split(" ");
						let rID = roleId[0];
						update.UpdateRole(rID, eID, () => {
							startProgram();
						});
					});
				break;
			default:
				connection.end();
				process.exit(0);
				break;
		}
	});
};
