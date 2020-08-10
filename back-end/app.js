const Koa = require('koa');
const Router = require('@koa/router');
const mysql = require("mysql");
const app = new Koa();
const router = new Router();
const bodyParser = require("koa-bodyparser");
const { readFileSync } = require("fs");

const mysqlConfig = {
    connectionLimit : 10,
    host            : "localhost",
    user            : 'root',
    password        : 'root',
    database        : 'blog'
};
const pool = mysql.createPool(mysqlConfig);

async function query(sql){
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err) reject(err);
            connection.query(sql, (error, result) => {
                resolve(result);
                connection.release();
                if(error) reject(error);
            });
        });
    });
}

app.use(async (ctx, next) => {
    ctx.set({
        "Access-Control-allow-Headers": "Content-type",
        "Access-Control-Allow-Origin": "http://192.168.0.107:8080"
        
    });
    await next();
})

router.post("/getEssayList", async (ctx, next) => {
    try{
        let {page, pageSize} = ctx.request.body;
        let result = await query(`SELECT e.id, title, userName AS author, LEFT(content, 100) AS contentSegment, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE e.authorId = u.id LIMIT ${ (page - 1) * pageSize }, ${ pageSize }`);
        if(result.length === 0){
            throw "error";
        }else{
            ctx.body = {
                code: 200,
                msg: "文章列表获取成功",
                data: result
            };
        }
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "文章列表获取失败",
            data: []
        };
    }
    finally{
        await next();
    }
});

router.post("/getEssayInfo", async (ctx, next) => {
    try{
        let { id, tagName } = ctx.request.body;
        let tagNameVal = `${tagName === "all" ? "" : `WHERE tagName = "${tagName}"`}`;
        let { essayListLength } = (await query(`SELECT COUNT(id) AS essayListLength FROM essay ${tagNameVal}`))[0];
        if(essayListLength === 0){
            throw "error";
        }
        tagNameVal = `${tagName === "all" ? "" : `tagName = "${tagName}" and`}`;
        let result = [];
        if(essayListLength === 1){
            let essayList = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE ${tagNameVal} e.authorId = u.id LIMIT 0, 2`);
            result.push(...[null, ...essayList, null]);
        }
        else if(id === 1){
            let essayList = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE ${tagNameVal} e.authorId = u.id LIMIT 0, 2`);
            result.push(...[null, ...essayList]);
        }
        else if(id === essayListLength){
            let essayList = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE ${tagNameVal} e.authorId = u.id LIMIT ${id - 2}, 2`);
            result.push(...[...essayList, null]);
        }
        else if(id < essayListLength && id > 1){
            result = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE ${tagNameVal} e.authorId = u.id LIMIT ${id - 2},3`);
        }
        else{
            throw "error";
        }
        ctx.body = {
            code: 200,
            msg: "文章获取成功",
            data: result
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "文章获取失败",
            data: []
        };
    }
    finally{
        await next();
    }
});

router.post("/getEssayTags", async (ctx, next) => {
    try{
        let tags = await query("SELECT tagName, count(id) AS count FROM essay GROUP BY tagName");
        if(tags.length === 0){
            throw("error");
        }
        ctx.body = {
            code: 200,
            msg: "文章标签获取成功",
            data: tags
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "文章获取失败",
            data: []
        };
    }
    finally{
        await next();
    }
});

router.post("/getEssayTagList", async (ctx, next) => {
    try{
        let {page, pageSize, tagName} = ctx.request.body;
        let result = await query(`SELECT e.id, title, userName AS author, LEFT(content, 100) AS contentSegment, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE tagName = '${tagName}' and e.authorId = u.id LIMIT ${ (page - 1) * pageSize }, ${ pageSize }`);
        if(result.length === 0){
            throw "error";
        }
        ctx.body = {
            code: 200,
            msg: "文章列表获取成功",
            data: result
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "文章列表获取失败",
            data: []
        };
    }
    finally{
        await next();
    }
});

router.post("/getEssayArchives", async (ctx, next) => {
    try{
        let archives = [];
        let essayList = await query(`SELECT id, title, CONVERT(updateTime, UNSIGNED) as updateTime FROM essay ORDER BY id`);
        if(essayList.length === 0){
            throw "error";
        }
        essayList.forEach(it => {
            let year = new Date(it.updateTime).getFullYear();
            let month = new Date(it.updateTime).getMonth() + 1;
            let time = `${year}年${month}月`;
            let existId = archives.findIndex(it => it.time === time);
            (existId === -1) ? archives.push({time, content: [it]}) : archives[existId].content.push(it);
        });
        ctx.body = {
            code: 200,
            msg: "归档列表获取成功",
            data: archives
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "文章归档列表获取失败",
            data: []
        };
    }
    finally{
        await next();
    }
});

router.post("/getIntro", async (ctx, next) => {
    try{
        let introInfo = readFileSync("./aboutMe.md", "UTF-8");
        ctx.body = {
            code: 200,
            msg: "简介信息获取成功",
            data: introInfo
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "简介信息获取失败",
            data: ""
        };
    }
    finally{
        await next();
    }
});

router.post("/getFriendlyLinks", async (ctx, next) => {
    try{
        let links = await query("select tagName, name, path from friendlyLinks");
        let result = [];
        if(links.length === 0){
            throw "error";
        }
        links.forEach(({tagName, name, path}) => {
            let existId = result.findIndex(it => it.tagName === tagName);
            if(existId === -1){
                result.push({tagName, links: [{name, path}]});
            }else{
                result[existId].links.push({name, path});
            }
        });
        ctx.body = {
            code: 200,
            msg: "友情链接列表获取成功",
            data: result
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "友情链接列表获取失败",
            data: []
        };
    }
    finally{
        await next();
    }
});
router.post("/addViewCount", async (ctx, next) => {
    try{
        let { id, viewCount } = ctx.request.body;
        await query(`UPDATE essay SET viewCount = ${viewCount + 1} WHERE id = ${id}`);
        ctx.body = {
            code: 200,
            msg: "阅读次数修改成功"
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "阅读次数修改失败"
        };
    }
    finally{
        await next();
    }
});

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods());

app.listen(8081);