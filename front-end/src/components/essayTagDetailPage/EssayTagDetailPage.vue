<template>
    <section id="EssayTagDetailPage" v-if="essayList.length !== 0">
        <div class="title">
            标签<span>{{tagName}}</span>下的文章
        </div>
        <article class="essay-list-bar">
            <essay-list v-for="essayListItem of essayList" :key="essayListItem.id" v-bind="addTagName(essayListItem)"></essay-list>
        </article>
        <nav class="nav ptr">
            <router-link :class="{hide: showBtn.prev === false}" :to='{name: "tag", params: {tagName, page: page - 1}}' tag="span">« 上一页</router-link>
            <router-link :to='{name: "tag", params: {tagName, page: 1}}' tag="span">文章标签</router-link>
            <router-link :class="{hide: showBtn.next === false}" :to='{name: "tag", params: {tagName, page: page + 1}}' tag="span">下一页 »</router-link>
        </nav>
    </section>
    <div v-else class="nothing">Nothing</div>
</template>

<script>
import EssayList from "../essayListPage/EssayList";

export default {
    components: {
        EssayList
    },
    computed: {
        tagName(){
            return this.$route.params.tagName;
        },
        page(){
            return this.$route.params.page * 1;
        }
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
    methods: {
        async updateEssayTagList(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getEssayTagList", {pageSize: this.pageSize, page: this.page, tagName: this.tagName});
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
            essayListItem.tagName = this.tagName;
            return essayListItem;
        }
    },
    created(){
        this.updateEssayTagList();
    },
    watch: {
        tagName(){
            this.updateEssayTagList();
        },
        page(page){
            this.updateEssayTagList();
        }
    }
}
</script>

<style lang="less" scoped>
#EssayTagDetailPage{
    .title{
        text-align: center;
        padding: 0.2rem 0;
        background-color: #f6f9fa;
        color: #999;
        font: 700 0.25rem/1 "微软雅黑";
        span{
            color: #2479CC;
        }
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