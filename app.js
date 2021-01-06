const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");
const view = require("./js/view");
const add = require("./js/add");
const questions = require("./js/questions");
const { viewDepartmentBudget } = require("./js/view");
const { updateEmpRole, updateEmpManager } = require("./js/update");
const { addEmp } = require("./js/add");
const { deleteEmp, deleteRole, deleteDept } = require("./js/delete");

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
let listDept = [];

// Start of program run
const startProgram = async () => {
	// Putting data into array for later use
	listEmploy = await getEmployees();
	listRole = await getRoles();
	listDept = await getDept();

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
				let rTitle = [];
				let eManager = [];

				listRole.forEach(({ id, title }) => {
					rTitle.push(id + " " + title);
				});
				listEmploy.forEach(({ id, first_name, last_name }) => {
					eManager.push(id+" "+first_name + " " + last_name);
				});
				eManager.push("none");

				addEmp(rTitle, eManager, () => {
					startProgram();
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

				updateEmpRole(eName, rName, () => {
					startProgram();
				});
				break;
			case "Update employee manager":
				// Storing employee and manager name to use for inquirer choices
				let empName = [];
				let mName = [];

				listEmploy.forEach(({ id, first_name, last_name }) => {
					empName.push(id + " " + first_name + " " + last_name);
					mName.push(id + " " + first_name + " " + last_name);
				});
				mName.push("no manager");

				updateEmpManager(empName, mName, () => {
					startProgram();
				});

				break;
			case "Delete employee":
				// Storing employee name to use for inquirer choices
				let eeName = [];

				listEmploy.forEach(({ id, first_name, last_name }) => {
					eeName.push(id + " " + first_name + " " + last_name);
				});

				deleteEmp(eeName, () => {
					startProgram();
				});
				break;
			case "Delete role":
				// Storing  role name to use for inquirer choices
				let rrName = [];

				listRole.forEach(({ id, title }) => {
					rrName.push(id + " " + title);
				});
				deleteRole(rrName, () => {
					startProgram();
				});
				break;
			case "Delete department":
				// Storing department name to use for inquirer choices
				let dName = [];

				listDept.forEach(({ id, name }) => {
					dName.push(id + " " + name);
				});

				deleteDept(dName, () => {
					startProgram();
				});
				break;
			case "View budget by department":
				// Storing department name to use for inquirer choices
				let dList = [];

				listDept.forEach(({ id, name }) => {
					dList.push(id + " " + name);
				});
				
				viewDepartmentBudget(dList, () => {
					startProgram();
				});
				break;
			default:
				connection.end();
				process.exit(0);
				break;
		}
	});
};

// Functions to get data for storage in varibles
const getEmployees = () => {
	connection.query("SELECT * FROM employee;", (err, results) => {
		if (err) throw err;
		results.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
			listEmploy.push({ id, first_name, last_name, role_id, manager_id });
		});
	});
	return listEmploy;
};

const getRoles = () => {
	connection.query("SELECT * FROM role;", (err, results) => {
		if (err) throw err;
		results.forEach(({ id, title, salary, department_id }) => {
			listRole.push({ id, title, salary, department_id });
		});
	});
	return listRole;
};

const getDept = () => {
	connection.query("SELECT * FROM department;", (err, results) => {
		if (err) throw err;
		results.forEach(({ id, name }) => {
			listDept.push({ id, name });
		});
	});
	return listDept;
};
