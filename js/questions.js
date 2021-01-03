const questions = {
	startMenu: [
		{
			name: "action",
			type: "list",
			message: "What would you like to do?",
			choices: [
				"View all employees",
				"View all roles",
				"View all departments",
				"Add department",
				"Add role",
				"Add employee",
				"Update employee role",
				"Update employee manager",
				"Delete employee",
				"Delete role",
				"Delete department",
				"EXIT",
			],
		},
	],

	addNewRole: [
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
			type: "number",
			message: "Department Id for new role ?",
		},
	],

	addDepartmentName: [
		{
			name: "newDept",
			type: "input",
			message: "What is the name of the department ?",
		},
	],

	// addNewEmployee: [
	// 	{
	// 		name: "firstName",
	// 		type: "input",
	// 		message: "Enter first name:",
	// 	},
	// 	{
	// 		name: "lastName",
	// 		type: "input",
	// 		message: "Enter last name:",
	// 	},
	// 	{
	// 		name: "roleId",
	// 		type: "list",
	// 		choices: rTitle,
	// 		message: "Select a role:",
	// 	},
	// 	{
	// 		name: "mangerId",
	// 		type: "list",
	// 		choices: eManager,
	// 		message: "Select a Manager",
	// 	},
	// ],

	// updateEmpoyeeRole: [
	// 	{
	// 		name: "selectEmployee",
	// 		type: "list",
	// 		choices: eName,
	// 		message: "Choose the employee whos role needs to be updated:",
	// 	},
	// 	{
	// 		name: "newRole",
	// 		type: "list",
	// 		choices: rName,
	// 		message: "Choose the new role for the selected empoyee:",
	// 	},
	// ],
};

module.exports = questions;
