<template>
    <div id="SearchListPage" v-if="search !== null">
        <div class="total-count" v-if="search.totalCount">本次搜索找到结果 {{search.totalCount}} 条</div>
        <div class="total-count-none" v-else>没有找到任何结果，请更换查询词试试~</div>
        <article class="search-list-bar">
            <search-list v-for="searchItem of search.list" :key="searchItem.id" v-bind="addKeywords(searchItem)"></search-list>
        </article>
        <nav class="nav ptr" v-if="search.totalCount">
            <router-link :class="{hide: page === 1}" :to='{name: "search", params: {keywords, page: page - 1}}' tag="span">« 上一页</router-link>
            <router-link :to='{name: "tag", params: {tagName, page: 1}}' tag="span">文章标签</router-link>
            <router-link :class="{hide: ((page - 1) * pageSize + search.list.length) === search.totalCount}" :to='{name: "search", params: {keywords, page: page + 1}}' tag="span">下一页 »</router-link>
        </nav>
    </div>
    <div class="nothing" v-else>Nothing</div>
</template>

<script>
import SearchList from "./SearchList";

export default {
    components: {
        SearchList
    },
    data(){
        return {
            pageSize: 10,
            search: null
        }
    },
    computed: {
        keywords(){
            return this.$route.params.keywords;
        },
        page(){
            return this.$route.params.page * 1;
        }
    },
    methods: {
        async updateHotKeywords(){
            await this.axios.post(this.apiUrl + "/updateHotKeywords", {keywords: this.keywords});
        },
        async updateSearchList(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getSearchList", {pageSize: this.pageSize, page: this.page, keywords: this.keywords});
            if(code == 200){
                this.search = data;
                this.updateHotKeywords();
            }
            if(code == 404){    
                this.search = {
                    list: [],
                    totalCount: 0
                };
            }
        },
        addKeywords(searchItem){
            return { ...searchItem, keywords: this.keywords };
        }
    },
    created(){
        this.updateSearchList();
    },
    watch: {
        keywords(keywords){
            this.updateSearchList();
        },
        page(page){
            this.updateSearchList();
        }
    }
}
</script>

<style lang="less" scoped>
#SearchListPage{
    .total-count{
        font: 500 0.13rem/1 "微软雅黑";
        color: #676767;
        padding: 0.15rem 0;
        border-bottom: 0.01rem solid #e9e9e9;
    }
    .total-count-none{
        font: 500 0.13rem/1 "微软雅黑";
        color: #676767;
        padding: 0.1rem 0.05rem;
        margin: 0.15rem 0;
        border: 0.01rem solid rgb(255,204,51);
        background-color: rgb(255,244,194);
    }
    .nav{
        color: #2479CC;
        display: flex;
        justify-content: space-between;
        padding: 0.2rem;
        border-bottom: 0.01rem solid #ddd;
        span{
            &.hide{
                visibility: hidden;
            }
        }
    }
}
</style>