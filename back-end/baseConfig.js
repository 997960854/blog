module.exports = {
    allowOrigin: ["http://www.yxlwq.com", "http://yxlwq.com", "http://192.168.1.101:8080"],
    mysqlConfig: {
        connectionLimit : 1000,
        host            : "localhost",
        user            : 'root',
        password        : 'root',
        database        : 'blog'
    }
}