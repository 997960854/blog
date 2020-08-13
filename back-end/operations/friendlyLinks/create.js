const mysql = require("mysql");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function create({tagName, name, path}){
    connection.connect();
    connection.query(`INSERT INTO friendlyLinks(tagName, name, path) VALUES ("${tagName}", "${name}", "${path}")`, (error, results) => {
        if (error) throw error;
        connection.end();
        console.log(results);
    });
}

let config = {
    tagName: "",
    name: "",
    path: ""
};

create(config);

