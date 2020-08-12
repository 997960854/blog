<template>
    <div id="SearchPage">
        <h1>站内搜索</h1>
        <div>
            <form class="search" @submit.prevent="search">
                <keep-acitve class="search-input">
                    <input type="search" required v-model.trim="keywords" placeholder="请输入关键字...">
                </keep-acitve>
                <input type="submit" value="提交">
            </form>
            <div class="result">
                <div class="hot-keywords" v-if="showHotKeywords">
                    <span>热搜词：</span>
                    <ul>
                        <router-link tag="li" v-for="({ keyword: keywords }, id) of hotKeywords" :key="id" :to='{ name: "search", params: { keywords:  keywords, page: 1 }}'>{{keywords}}</router-link>
                    </ul>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            keywords: "",
            hotKeywords: [],
            showHotKeywords: false
        }
    },
    methods: {
        search(){
            if(this.paramsChange){
                this.$router.push({name: "search", params: {keywords: this.keywords, page: 1}});
            }else{
                this.$forceUpdate();
            }
        },
        async updateHotKeywords(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl+"/getHotKeywords", {count: 5});
            if(code === 200){
                this.hotKeywords = data;
                this.showHotKeywords = true;
            }
        }
    },
    created(){
        if(this.$route.path === "/search"){
            this.updateHotKeywords();
        }
    },
    computed: {
        paramsChange(){
            return this.$route.params.keywords !== this.keywords;
        }
    },
    watch: {
        "$route.path": function(path){
            if(path !== "/search"){
               this.showHotKeywords = false;
            }else{
                this.updateHotKeywords();
            }
        }
    }
}
</script>

<style lang="less" scoped>
#SearchPage{
    h1{
        margin: 0.3rem 0;
        font: 300 0.32rem/1 "微软雅黑";
    }
    & > div{
        .search{
            border: 1px solid #bbb;
            display: flex;
            input{
                font: 500 0.16rem/1 "微软雅黑";
                border-width: 0;
                outline-width: 0;
            }
            .search-input{
                flex-grow: 1;
                display: flex;
                input{
                    flex-grow: 1;
                    padding: 0.1rem 0.04rem;
                }
            }
            & > input{
                padding: 0.1rem 0.2rem;
                border-left: 1px solid #bbb;
                cursor: pointer;
            }
        }
        .result{
            .hot-keywords{
                margin: 0.2rem 0;
                span{
                    color: #666;
                }
                ul{
                    display: inline-block;
                    li{
                        display: inline-block;
                        margin: 0 0.1rem;
                        color: #2479CC;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>