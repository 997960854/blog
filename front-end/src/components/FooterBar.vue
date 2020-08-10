<template>
    <footer id="FooterBar">
        <p v-for="(info, id) of siteInfo" :key="id">{{info}}</p>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            siteInfo: [
                "Copyright © xinlei Yang. All rights reserved"
            ]
        }
    }
}
</script>

<style lang="less" scoped>
#FooterBar{
    padding: 0.15rem;
    color: #666;
    font: 500 0.14rem/1 "微软雅黑";
    text-align: center;
    p:not(:last-child){
        margin-bottom: 0.1rem;
    }
}
</style>