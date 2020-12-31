const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

module.exports = {
    listOfEmployees: function () {
        connection.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            return results;
            // callBack(results);
        });
    },
}