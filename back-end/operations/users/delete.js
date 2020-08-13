const mysql = require("mysql");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function deleteUser({ id }){
    connection.connect();
    connection.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        connection.end();
        console.log(results);
    });
}

let config = {
    id: 1
};

deleteUser(config);

