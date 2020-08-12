<template>
    <article id="EssayArchives" v-if="archivesInfo.length !== 0">
        <h1>归档</h1>
        <div v-for="(it, id) of archivesInfo" :key="id">
            <h1>{{it.time| titleTimeFormat}}({{it.content.length}})</h1>
            <ul>
                <li v-for="it of it.content" :key="it.id">
                    <router-link :to='{name: "essay", params: {id: it.id}}'  tag="span">{{it.title}}</router-link>
                    <span>{{it.updateTime| tagTimeFormat}}</span>
                </li>
            </ul>
        </div>
    </article>
    <div v-else class="nothing">Nothing</div>
</template>

<script>
export default {
    data(){
        return {
            archivesInfo: [],
        }
    },
    methods: {
        async updateArchives(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getEssayArchives");
            if(code === 200){
                this.archivesInfo = data;
            }
            if(code === 404){
                this.archivesInfo = [];
            }
        }
    },
    created(){
        this.updateArchives();
    },
    filters: {
        titleTimeFormat(time){
            let year = new Date(time).getFullYear();
            let month = new Date(time).getMonth() + 1;
            return `${year}年${month}月`;
        },
        tagTimeFormat(time){
            let year = new Date(time).getFullYear();
            let month = new Date(time).getMonth() + 1;
            let date = new Date(time).getDate();
            return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
        }
    }
}
</script>

<style lang="less" scoped>
#EssayArchives{
    position: relative;
    padding: 0.3rem 0;
    color: #666;
    border-bottom: 1px solid #ddd;
    @media screen and (max-width: 768px){
        padding: 0.15rem 0;
    }
    & > h1{
        margin-bottom: 0.25rem;
        font: 300 0.32rem/1.2 "微软雅黑";
    }
    div{
        h1{
            font-size: 0.17rem;
        }
        ul{
            margin: 0.25rem 0;
            li{
                margin: 0.15rem 0.3rem;
                span{
                    color: #2479CC;
                    &:first-child{
                        cursor: pointer;
                    }
                    &:last-child{
                        color: #999;
                        font: italic 500 0.13rem/1 "微软雅黑";
                        margin-left: 0.1rem;
                    }
                }
            }
        }
    }
}
</style>