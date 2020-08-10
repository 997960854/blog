<template>
    <router-link tag="div" id="TagBar" :to='{name: "tag", params: {tagName, page: 1}}'>
        <span>{{tagName}}({{count}})</span>
    </router-link>
</template>

<script>
export default {
    props: ["tagName", "count"]
}
</script>

<style lang="less" scoped>
#TagBar{
    box-sizing: border-box;
    border: 1px solid rgba(36,121,204,.8);
    border-radius: 0.04rem;
    color: rgba(36,121,204,.8);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.15rem;
    transition: color 0.15s, border 0.15s;
    &:hover{
        border-color: #2479CC;
        color: #2479CC;
    }
    cursor: pointer;
    span{
        font-size: 0.14rem;
        line-height: 2.5;
    }
}
</style>