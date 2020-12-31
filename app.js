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
				connection.query("SELECT * FROM employee", (err, results) => {
					if (err) throw err;
					inquirer.prompt([
						{
							name: "selectEmployee",
							type: "rawlist",
							choices() {
								const choiceArray = [];
								results.forEach(({ first_name, last_name }) => {
									choiceArray.push(first_name+" "+last_name);
								});
								return choiceArray;
							},
							message: "Choose the employee whos role needs to be updated:",
						},
						{
							name: "newRole",
							type: "input",
							message: "What is the new role for the selected empoyee ?",
						},
					]);
				});
				// update.listOfEmployees(({ results }) => {
				// 	inquirer
				// 		.prompt(results, questions.updateEmpoyeeRole)
				// 		.then((answers) => {});
				// });
				break;
			default:
				connection.end();
				process.exit(0);
				break;
		}
	});
};
