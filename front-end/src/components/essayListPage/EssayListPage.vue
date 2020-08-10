<template>
    <main id="EssayListPage" v-if="essayList.length !== 0">
        <article class="essay-list-bar">
            <essay-list v-for="essayListItem of essayList" :key="essayListItem.id" v-bind="addTagName(essayListItem)"></essay-list>
        </article>
        <nav-bar :page="page" v-bind="this.showBtn"></nav-bar>
    </main>
    <div v-else class="nothing">Nothing</div>
</template>

<script>
import EssayList from "./EssayList";
import Nav from "./Nav";

export default {
    components: {
        EssayList,
        NavBar: Nav
    },
    data(){
        return {
            pageSize: 10,
            essayList: [],
            showBtn: {
                next: true,
                prev: true,
            }
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
                this.essayList = data;
                this.essayList.length < this.pageSize ? (this.showBtn.next = false) : (this.showBtn.next = true);
                this.page === 1 ? (this.showBtn.prev = false) : (this.showBtn.prev = true);
            }
            if(code == 404){    
                this.essayList = [];
            }
        },
        addTagName(essayListItem){
            essayListItem.tagName = "all";
            return essayListItem;
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
}
</style>