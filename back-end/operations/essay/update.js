const mysql = require("mysql");
const { readFileSync } = require("fs");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function update({id, title, author, tagName, filePath}){
    let content = readFileSync(filePath, "utf8");
    let updateTime = (new Date()) * 1 + "";
    connection.connect();
    connection.query(`SELECT id as authorId FROM users WHERE userName = "${author}"`, (error, results) => {
        if (error) throw error;
        let [{authorId}] = results;
        connection.query(`UPDATE essay SET title = "${title}", authorId = ${authorId}, tagName = "${tagName}", content = "${content}", updateTime = "${updateTime}" WHERE id = ${id}`, (error, results) => {
            if (error) throw error;
            connection.end();
            console.log(results);
        });
    });
}

let config = {
    id: 1,
    title: "",
    author: "",
    tagName: "",
    filePath: ""
};

update(config);

