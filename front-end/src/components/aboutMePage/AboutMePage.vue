<template>
    <article id="AboutMePage" v-if="intro">
        <h1>关于我(About Me)</h1>
        <section v-md="intro"></section>
    </article>
    <div class="nothing" v-else>Nothing</div>
</template>

<script>
export default {
    data(){
        return {
            intro: ""
        }
    },
    methods: {
        async updateIntro(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getIntro");
            if(code === 404){
                this.intro = "";
            }
            if(code === 200){
                this.intro = data;
            }
        }
    },
    created(){
        this.updateIntro();
    }
}
</script>

<style lang="less" scoped>
#AboutMePage{
    padding: 0.3rem 0;
    border-bottom: 1px solid #ddd;
    h1{
        color: #333;
        font: 300 0.32rem/1 "微软雅黑";
        margin-bottom: 0.25rem;
    }
}
</style>