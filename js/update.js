const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employees_db",
});

module.exports = {
    UpdateRole: function (rID, eID, callBack) {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?;', 
        [rID, eID], (err, results) => {
            if (err) throw err;
            console.log("New role has been updated!");
            callBack(rID, eID, results);
        });
    },
}