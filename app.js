const mysql = require("mysql");
const inquirer = require("inquirer");

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
	startProgram();
});
