<template>
    <article id="SearchList">
        <div class="title">
            <router-link :to='{name: "searchEssay", params: { id, keywords }}' tag="h1">{{title}}</router-link>
        </div>
        <div class="main">
            <p v-md="contentSegment"></p>
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
        keywords: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
#SearchList{
    padding: 0.08rem 0;
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
            font: 500 0.16rem/1.2 "微软雅黑";
            color: #2479CC;
            cursor: pointer;
            text-decoration: underline;
        }
    }
    .main{
        margin: 0.15rem 0;
        p{
            font-size: 0.14rem;
            color: #555;
            line-height: 1.8;
        }
    }
}
</style>