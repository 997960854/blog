const mysql = require("mysql");
const { mysqlConfig } = require("../../baseConfig");
const connection = mysql.createConnection(mysqlConfig);

async function create({ userName, countName, password }){
    let updateTime = createTime = (new Date()) * 1 + "";
    connection.connect();
    connection.query(`INSERT INTO users(userName, countName, password, createTime, updateTime) VALUES("${userName}", "${countName}", "${password}", "${createTime}", "${updateTime}");`, (error, results) => {
        if (error) throw error;
        connection.end();
        console.log(results);
    });
}

let config = {
    userName: "yxlwq",
    countName: "a804862153",
    password: "woaini19990329"
};

create(config);

