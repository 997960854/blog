const mysql = require("mysql");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function update({id, userName, countName, password}){
    connection.connect();
    connection.query(`UPDATE users SET userName = "${userName}", countName = "${countName}", password = "${password}" WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        connection.end();
        console.log(results);
    });
}

let config = {
    id: 1,
    userName: "",
    countName: "",
    password: ""
};

update(config);

