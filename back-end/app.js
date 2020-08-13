const Koa = require('koa');
const Router = require('@koa/router');
const mysql = require("mysql");
const app = new Koa();
const router = new Router();
const bodyParser = require("koa-bodyparser");
const { readFileSync } = require("fs");
const { allowOrigin, mysqlConfig } = require("./baseConfig");

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
    let origin = ctx.request.headers.origin;
    ctx.set({
        "Access-Control-allow-Headers": "Content-type"
    });
    if(allowOrigin.includes(origin)){
        ctx.set({
            "Access-Control-allow-Origin": origin
        });
    }
    await next();
})

router.post("/getEssayList", async (ctx, next) => {
    try{
        let {page, pageSize} = ctx.request.body;
        let result = {};
        result.list = await query(`SELECT e.id, title, userName AS author, LEFT(content, 100) AS contentSegment, CAST(e.updateTime AS UNSIGNED) AS updateTime, viewCount FROM essay e, users u WHERE e.authorId = u.id ORDER BY CONVERT(updateTime, UNSIGNED) DESC LIMIT ${ (page - 1) * pageSize }, ${ pageSize }`);
        result.totalCount = (await query("SELECT COUNT(e.id) as totalCount FROM essay e, users u WHERE e.authorId = u.id"))[0].totalCount;
        if(result.list.length === 0){
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
            msg: "文章列表获取失败"
        };
    }
    finally{
        await next();
    }
});

router.post("/getEssayInfo", async (ctx, next) => {
    try{
        let { id } = ctx.request.body;
        let result = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE e.id = ${id} and e.authorId = u.id`);
        if(result.length === 0){
            throw "error";
        }
        let prevEssay = await query(`select e.id, title from essay e, users u where e.authorId = u.id and convert(updateTime, unsigned) > (select convert(updateTime, unsigned) from essay where id = ${id}) order by convert(updateTime, unsigned) limit 1`);
        let nextEssay = await query(`select e.id, title from essay e, users u where e.authorId = u.id and convert(updateTime, unsigned) < (select convert(updateTime, unsigned) from essay where id = ${id}) order by convert(updateTime, unsigned) desc limit 1`);
        if(prevEssay.length === 0){
            result.unshift(null);
        }else{
            result.unshift(...prevEssay);
        }
        if(nextEssay.length === 0){
            result.push(null);
        }else{
            result.push(...nextEssay);
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
        let result = {};
        result.list = await query(`SELECT e.id, title, userName AS author, LEFT(content, 100) AS contentSegment, CAST(e.updateTime AS UNSIGNED) AS updateTime, viewCount, tagName FROM essay e, users u WHERE tagName = '${tagName}' and e.authorId = u.id ORDER BY CONVERT(updateTime, UNSIGNED) DESC LIMIT ${ (page - 1) * pageSize }, ${ pageSize }`);
        result.totalCount = (await query(`SELECT COUNT(e.id) as totalCount FROM essay e, users u WHERE tagName = '${tagName}' and e.authorId = u.id`))[0].totalCount;
        if(result.list.length === 0){
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
            msg: "文章列表获取失败"
        };
    }
    finally{
        await next();
    }
});

router.post("/getEssayTagInfo", async (ctx, next) => {
    try{
        let { id, tagName } = ctx.request.body;
        let result = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE tagName = "${tagName}" and e.id = ${id} and e.authorId = u.id`);
        if(result.length === 0){
            throw "error";
        }
        let prevEssay = await query(`select e.id, title from essay e, users u where tagName = "${tagName}" and e.authorId = u.id and convert(updateTime, unsigned) > (select convert(updateTime, unsigned) from essay where id = ${id}) order by convert(updateTime, unsigned) limit 1`);
        let nextEssay = await query(`select e.id, title from essay e, users u where tagName = "${tagName}" and e.authorId = u.id and convert(updateTime, unsigned) < (select convert(updateTime, unsigned) from essay where id = ${id}) order by convert(updateTime, unsigned) desc limit 1`);
        if(prevEssay.length === 0){
            result.unshift(null);
        }else{
            result.unshift(...prevEssay);
        }
        if(nextEssay.length === 0){
            result.push(null);
        }else{
            result.push(...nextEssay);
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

router.post("/getEssayArchives", async (ctx, next) => {
    try{
        let archives = [];
        let essayList = await query(`SELECT id, title, CONVERT(updateTime, UNSIGNED) as updateTime FROM essay ORDER BY CONVERT(updateTime, UNSIGNED) DESC`);
        if(essayList.length === 0){
            throw "error";
        }
        essayList.forEach(it => {
            let essayListYear = new Date(it.updateTime).getFullYear();
            let essayListMonth = new Date(it.updateTime).getMonth() + 1;
            let existId = archives.findIndex(it => {
                year = new Date(it.time).getFullYear();
                month = new Date(it.time).getMonth() + 1;
                return year === essayListYear && month === essayListMonth;
            });
            (existId === -1) ? archives.push({time: it.updateTime, content: [it]}) : archives[existId].content.push(it);
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
        let links = await query("SELECT tagName, name, path FROM friendlyLinks ORDER BY id DESC");
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

router.post("/getSearchList", async (ctx, next) => {
    try{
        let {page, pageSize, keywords} = ctx.request.body;
        let search = "";
        let result = {};
        keywords.trim().split(/\s+/).forEach(keyword => {
            search += `(title LIKE "%${keyword}%" OR content LIKE "%${keyword}%" OR userName LIKE "%${keyword}%") and `;
        });
        result.list = await query(`SELECT e.id, title, LEFT(content, 100) AS contentSegment FROM essay e, users u WHERE ${search}  e.authorId = u.id ORDER BY CONVERT(updateTime, UNSIGNED) DESC LIMIT ${ (page - 1) * pageSize }, ${ pageSize }`);
        result.totalCount = (await query(`SELECT COUNT(e.id) as totalCount FROM essay e, users u WHERE ${search}  e.authorId = u.id`))[0].totalCount;
        if(result.list.length === 0){
            throw "error";
        }
        ctx.body = {
            code: 200,
            msg: "查询文章内容成功",
            data: result
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "查询文章内容失败"
        };
    }
    finally{
        await next();
    }
});

router.post("/updateHotKeywords", async (ctx, next) => {
    try{
        let {keywords} = ctx.request.body;
        for(let keyword of keywords.trim().split(/\s+/)){
            let result = await query(`SELECT id, searchCount FROM hotKeywords WHERE keyword = "${keyword}"`);
            if(result.length !== 0){
                ([result] = result);
                await query(`UPDATE hotKeywords SET searchCount = ${result.searchCount + 1} WHERE id = ${result.id}`);
            }else{
                await query(`INSERT INTO hotKeywords(keyword) VALUES ("${keyword}")`);
            }
        }
        ctx.body = {
            code: 200,
            msg: "更新热搜词成功"
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "更新热搜词失败"
        };
    }
    finally{
        await next();
    }
});

router.post("/getHotKeywords", async (ctx, next) => {
    try{
        let {count} = ctx.request.body;
        let result = await query(`SELECT keyword FROM hotKeywords ORDER BY searchCount DESC LIMIT ${count}`);
        if(result.length === 0){
            throw "error";
        }
        ctx.body = {
            code: 200,
            msg: "获取热搜词成功",
            data: result
        };
    }
    catch(err){
        ctx.body = {
            code: 404,
            msg: "获取热搜词失败"
        };
    }
    finally{
        await next();
    }
});

router.post("/getsearchEssayInfo", async (ctx, next) => {
    try{
        let { id, keywords } = ctx.request.body;
        let search = "";
        keywords.trim().split(/\s+/).forEach(keyword => {
            search += `(title LIKE "%${keyword}%" OR content LIKE "%${keyword}%" OR userName LIKE "%${keyword}%") and`;
        });
        let result = await query(`SELECT e.id, title, userName AS author, content, CAST(e.createTime AS UNSIGNED) AS createTime, viewCount FROM essay e, users u WHERE e.id = ${id} and e.authorId = u.id and ${search.slice(0, -4)}`);
        if(result.length === 0){
            throw "error";
        }
        let prevEssay = await query(`select e.id, title from essay e, users u where e.authorId = u.id and ${search} convert(updateTime, unsigned) > (select convert(updateTime, unsigned) from essay where id = ${id}) order by convert(updateTime, unsigned) limit 1`);
        let nextEssay = await query(`select e.id, title from essay e, users u where e.authorId = u.id and ${search} convert(updateTime, unsigned) < (select convert(updateTime, unsigned) from essay where id = ${id}) order by convert(updateTime, unsigned) desc limit 1`);
        if(prevEssay.length === 0){
            result.unshift(null);
        }else{
            result.unshift(...prevEssay);
        }
        if(nextEssay.length === 0){
            result.push(null);
        }else{
            result.push(...nextEssay);
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

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods());

app.listen(8081);