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

	addNewEmployee: [
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
			type: "number",
			message: "Enter role ID:",
		},
		{
			name: "mangerId",
			type: "number",
			message: "Enter manger ID, if none enter null:",
		},
	],

	updateEmpoyeeRole: [
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
            name: 'newRole',
            type: 'input',
            message: 'What is the new role for the selected empoyee ?',
        },
	],
};

module.exports = questions;
