import { mock, Random } from "mockjs";
import { apiUrl } from "../baseConfig";

let { essayList } = mock({
    "essayList|54": [
        {
            "id|+1": 0,
            title: ()=>Random.ctitle(3,8),
            contentSegment: ()=>Random.cparagraph(),
            content(){
                return this.contentSegment + Random.cparagraph(50,200)
            },
            author: "admin",
            createTime: ()=>Random.date("T") * 1,
            commentCount: ()=>Random.integer(0, 10 ** 7),
            "tag|1": ["mysql", "php", "git相关配置", "Linux命令", "Javascript", "Ajax技术"]
        }
    ]
});

let { friendlyLinks } = mock({
    "friendlyLinks|3": [{
        tagName: () => Random.cword(3, 5),
        links: () => {
            let { result } = mock({
                "result|2-6": [{
                    name: () => Random.cword(4,10),
                    path: () => Random.url("https", "test.com")
                }]
            });
            return result;
        }
    }]
});

let { intro } = mock({
    intro: Random.cparagraph(50, 200)
});

essayList.sort((r,l) => {
    return l.createTime - r.createTime;
});

mock(apiUrl + "/getEssayList", ({body})=>{
    let {page, pageSize} = JSON.parse(body);
    let result = essayList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    if(result.length === 0){
        return {
            code: 404,
            msg: "文章列表获取失败",
            data: []
        }
    }else{
        return {
            code: 200,
            msg: "文章列表获取成功",
            data: result
        }
    }
});

mock(apiUrl + "/getEssayInfo", ({body})=>{
    let {id} = JSON.parse(body);
    id = essayList.findIndex(it => it.id === id);
    if(id === -1){
        return {
            code: 404,
            msg: "文章获取失败",
            data: []
        }
    }else{
        let result = {
            code: 200,
            msg: "文章获取成功"
        };
        if(id === 0){
            result.data = essayList.slice(0, 2);
            result.data.unshift(null);
        }else if(id === (essayList.length - 1)){
            result.data = essayList.slice(id - 1, essayList.length);
            result.data.push(null);
        }else{
            result.data = essayList.slice(id - 1, id + 2);
        }
        return result;
    }
});

mock(apiUrl + "/getEssayArchives", () => {
    let arr = [];
    if(essayList.length === 0){
        return {
            code: 404,
            msg: "查询失败",
            data: []
        }
    };
    essayList.forEach(essayListIt => {
        let year = new Date(essayListIt.createTime).getFullYear();
        let month = new Date(essayListIt.createTime).getMonth() + 1;
        let time = `${year}年${month}月`;
        if(arr.length === 0){
            arr.push({time, content: [essayListIt]});
        }else{
            let index = -1;
            let exist = arr.some((it, id) => {
                if(it.time === time){
                    index = id;
                    return true; 
                }
            });
            if(exist){
                arr[index].content.push(essayListIt);
            }else{
                arr.push({time, content: [essayListIt]});
            }
        }
    });
    
    return {
        code: 200,
        msg: "查询成功",
        data: arr
    };
});

mock(apiUrl + "/getEssayTags", () => {
    let arr = [];
    if(essayList.length === 0){
        return {
            code: 404,
            msg: "查询失败",
            data: []
        }
    };
    essayList.forEach(essayListIt => {
        if(arr.length === 0){
            arr.push({tag: essayListIt.tag, count: 1});
        }else{
            let index = -1;
            let exist = arr.some((it, id) => {
                if(it.tag === essayListIt.tag){
                    index = id;
                    return true; 
                }
            });
            if(exist){
                arr[index].count++;
            }else{
                arr.push({tag: essayListIt.tag, count: 1});
            }
        }
    });
    return {
        code: 200,
        msg: "查询成功",
        data: arr
    };
});

mock(apiUrl + "/getEssayTagList", ({body}) => {
    let {page, pageSize, tagName} = JSON.parse(body);
    let essayTagList = essayList.filter(it => it.tag === tagName);
    if(essayTagList.length === 0 || (page - 1) * pageSize > (essayTagList.length - 1)){
        return {
            code: 404,
            msg: "文章列表获取失败",
            data: []
        }
    }else{
        let result = essayTagList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return {
            code: 200,
            msg: "文章列表获取成功",
            data: result
        }
    }
});

mock(apiUrl + "/getFriendlyLinks", () => {
    if(friendlyLinks.length === 0){
        return {
            code: 404,
            msg: "友情链接列表获取失败",
            data: []
        }
    }
    return {
        code: 200,
        msg: "友情链接列表获取成功",
        data: friendlyLinks
    }
});

mock(apiUrl + "/getIntro", () => {
    if(intro.length === 0){
        return {
            code: 404,
            msg: "关于我的信息获取失败",
            data: []
        }
    }
    return {
        code: 200,
        msg: "关于我的信息获取成功",
        data: intro
    }
});