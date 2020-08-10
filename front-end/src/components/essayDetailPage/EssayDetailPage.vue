<template>
    <main id="EssayDetailPage" v-if="essay">
        <article>
            <div class="title">
                <h1>{{essay.title}}</h1>
                <div class="meta">
                    <div>
                        <span class="author">{{essay.author}}</span>
                        <span>发布于</span>
                        <span class="date">{{essay.createTime| timeFormat}}</span>
                    </div>
                    <div>
                        <span class="view">{{essay.viewCount| countFormat}}</span>
                        <span>次阅读</span>
                    </div>
                </div>
            </div>
            <div class="main" v-md="essay.content">
            </div>
        </article>
        <nav v-if="navBtn.prev !== null || navBtn.next !== null">
            <div>
                <router-link :class="{hide: (navBtn.prev === null)}" :to='navBtn.prev === null ? "" : {name: "essay", params: {id: navBtn.prev.id}}' tag="span">« {{navBtn.prev === null ? "" : navBtn.prev.title}}</router-link>
            </div>
            <div>
                <router-link :class="{hide: (navBtn.next=== null)}" :to='navBtn.next === null ? "" : {name: "essay", params: {id: navBtn.next.id}}' tag="span">{{navBtn.next === null ? "" : navBtn.next.title }} »</router-link>
            </div>
        </nav>
    </main>
    <div v-else class="nothing">Nothing</div>
</template>

<script>
export default {
    computed: {
        id(){
            return this.$route.params.id * 1;
        },
        tagName(){
            return this.$route.params.tagName
        }
    },
    data(){
        return {
            essay: null,
            navBtn: {
                prev: null,
                next: null
            }
        }
    },
    methods: {
        async updateEssay(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getEssayInfo", {id: this.id, tagName: this.tagName});
            if(code == 200){
                [this.navBtn.prev, this.essay, this.navBtn.next] = data;
                this.updateViewCount();
            }
            if(code == 404){
                this.essay = null;
            }
        },
        async updateViewCount(){
            let {data: {code, msg}} = await this.axios.post(this.apiUrl + "/addViewCount", {viewCount: this.essay.viewCount, id: this.essay.id});
            if(code === 200){
                this.essay.viewCount++;
            }
        }
    },
    created(){
        this.updateEssay();
    },
    watch: {
        id(id){
            this.updateEssay();
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
#EssayDetailPage{
    article{
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
    }
    nav{
        padding: 0.2rem 0;
        color: #2479CC;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        div{
            flex: 1 1;
            span{
                cursor: pointer;
                &:last-child{
                    text-align: right;
                }
                &.hide{
                    visibility: hidden;
                }
            }
            &:last-child{
                span{
                    float: right;
                }
            }
        }
    }
}
</style>