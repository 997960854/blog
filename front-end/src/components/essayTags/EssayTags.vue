<template>
    <article id="EssayTags" v-if="tags.length !== 0">
        <h1>标签</h1>
        <section>
            <tag-bar v-for="(it, id) of tags" :key="id" :tagName="it.tagName" :count="it.count"></tag-bar>
        </section>
    </article>
    <div v-else class="nothing">Nothing</div>
</template>

<script>
import TagBar from "./TagBar";

export default {
    components: {TagBar},
    data(){
        return {
            tags: []
        }
    },
    methods: {
        async updateEssayTags(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getEssayTags");
            if(code === 200){
                this.tags = data;
            }
            if(code === 404){
                this.tags = [];
            }
        }
    },
    created(){
        this.updateEssayTags();
    }
}
</script>

<style lang="less" scoped>
.nothing-essay{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    font: 300 0.32rem/1.2 "微软雅黑";
}
#EssayTags{
    position: relative;
    padding: 0.3rem 0;
    border-bottom: 1px solid #ddd;
    h1{
        color: #333;
        font: 300 0.32rem/1.2 "微软雅黑";
        margin-bottom: 0.25rem;
    }
    section{
        div{
            margin: 0 0.15rem 0.1rem 0;
        }
    }
}
</style>