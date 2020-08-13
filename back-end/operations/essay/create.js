const mysql = require("mysql");
const { readFileSync } = require("fs");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function create({title, author, tagName, filePath}){
    let content = readFileSync(filePath, "utf8");
    let updateTime = createTime = (new Date()) * 1 + "";
    connection.connect();
    connection.query(`SELECT id as authorId FROM users WHERE userName = "${author}"`, (error, results) => {
        if (error) throw error;
        let [{authorId}] = results;
        connection.query(`INSERT INTO essay(title, authorId, tagName, content, updateTime, createTime) VALUES ("${title}", ${authorId}, "${tagName}", "${content}", "${updateTime}", "${createTime}")`, (error, results) => {
            if (error) throw error;
            connection.end();
            console.log(results);
        });
    });
}

let config = {
    title: "",
    author: "",
    tagName: "",
    filePath: ""
};

create(config);

