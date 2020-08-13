const mysql = require("mysql");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function update({id, tagName, name, path}){
    connection.connect();
    connection.query(`UPDATE friendlyLinks SET tagName = "${tagName}", name = "${name}", path = "${path}" WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        connection.end();
        console.log(results);
    });
}

let config = {
    id: 1,
    tagName: "",
    name: "",
    path: ""
};

update(config);

