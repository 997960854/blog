const mysql = require("mysql");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function deleteEssay({ id }){
    connection.connect();
    connection.query(`DELETE FROM essay WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        connection.end();
        console.log(results);
    });
}

let config = {
    id: 1
};

deleteEssay(config);

