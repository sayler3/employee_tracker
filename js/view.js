const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results)
        startProgram();
    });
};

module.exports = { viewAllEmployees };