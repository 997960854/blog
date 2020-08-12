<template>
    <main id="EssayListPage" v-if="essay !== null && essay.list.length !== 0">
        <article class="essay-list-bar">
            <essay-list v-for="essayListItem of essay.list" :key="essayListItem.id" v-bind="essayListItem"></essay-list>
        </article>
        <nav class="nav ptr">
            <router-link :class="{hide: page === 1}" :to='{name: "page", params: {page: page - 1}}' tag="span">« 上一页</router-link>
            <router-link to="/" tag="span">博客归档</router-link>
            <router-link :class="{hide: ((page - 1) * pageSize + essay.list.length) === essay.totalCount}" :to='{name: "page", params: {page: page + 1}}' tag="span">下一页 »</router-link>
        </nav>
    </main>
    <div v-else class="nothing">Nothing</div>
</template>

<script>
import EssayList from "./EssayList";

export default {
    components: {
        EssayList
    },
    data(){
        return {
            pageSize: 10,
            essay: null
        }
    },
    computed: {
        page(){
            return this.$route.params.page * 1;
        }
    },
    methods: {
        async updateEssayList(pageSize, page){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getEssayList", {pageSize, page});
            if(code == 200){
                this.essay = data;
            }
            if(code == 404){    
                this.essay = {
                    list: [],
                    totalCount: 0
                };
            }
        }
    },
    created(){
        this.updateEssayList(this.pageSize, this.page);
    },
    watch: {
        page(page){
            this.updateEssayList(this.pageSize, page);
        }
    }
}
</script>

<style lang="less" scoped>
.nothing-essay{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font: 300 0.32rem/1 "微软雅黑";
}
#EssayListPage{
    display: flex;
    flex-direction: column;
    .essay-list-bar{
        flex-grow: 1;
    }
    .nav{
        color: #2479CC;
        display: flex;
        justify-content: space-between;
        padding: 0.2rem;
        border-bottom: 1px solid #ddd;
        span{
            &.hide{
                visibility: hidden;
            }
        }
    }
}
</style>