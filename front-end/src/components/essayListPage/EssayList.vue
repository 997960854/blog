<template>
    <article id="EssayList">
        <div class="title">
            <router-link :to='{name: "essay", params: {id, tagName}}' tag="h1">{{title}}</router-link>
            <div class="meta">
                <div>
                    <span class="author">{{author}}</span>
                    <span>发布于</span>
                    <span class="date">{{createTime| timeFormat}}</span>
                </div>
                <div>
                    <span class="view">{{viewCount| countFormat}}</span>
                    <span>次阅读</span>
                </div>
            </div>
        </div>
        <div class="main">
            <p v-md="contentSegment"></p>
            <nav><router-link :to='{name: "essay", params: {id, tagName}}' tag="p">阅读全文 »</router-link></nav>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        contentSegment: {
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        createTime: {
            type: Number,
            required: true
        },
        viewCount: {
            type: Number,
            required: true
        },
        tagName: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
#EssayList{
    padding: 0.3rem 0;
    border-bottom: 1px solid #ddd;
    @media screen and (max-width: 768px){
        padding: 0.1rem 0;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        h1{
            word-break: break-all;
            color: #333;
            font: 300 0.32rem/1.2 "微软雅黑";
            &:hover{
                transition: color 0.2s ease-in;
                color: #2479CC;
                cursor: pointer;
            }
        }
        .meta{
            flex-shrink: 0;
            font: 500 0.15rem/2 "微软雅黑";
            @media screen and (max-width: 768px){
                display: none;
            }
            & > :first-child{
                color: #555;
                span:nth-child(2){
                    margin: 0 0.05rem;
                }
            }
            & > :last-child{
                font-size: 0.13rem;
                color: #999;
                display: flex;
                justify-content: flex-end;
                span:nth-child(1){
                    margin-right: 0.05rem;
                    margin-left: auto;
                }
            }
        }
    }
    .main{
        p{
            color: #555;
            line-height: 1.8;
        }
        nav{
            margin: 0.15rem 0;
            @media screen and (max-width: 768px){
                margin: 0.05rem 0;
            }
            p{
                display: inline-block;
                color: #2479CC;
                cursor: pointer;
                @media screen and (max-width: 768px){
                    font-size: 0.14rem;
                }
            }
        }
    }
}
</style>