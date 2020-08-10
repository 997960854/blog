<template>
    <nav id="Nav" class="ptr">
        <router-link :class="{hide: prev === false}" :to='{name: "page", params: {page: page - 1}}' tag="span">« 上一页</router-link>
        <router-link to="/" tag="span">博客归档</router-link>
        <router-link :class="{hide: next === false}" :to='{name: "page", params: {page: page + 1}}' tag="span">下一页 »</router-link>
    </nav>
</template>

<script>
export default {
    props: {
        page: {
            type: Number,
            required: true
        },
        prev: {
            type: Boolean,
            required: true
        },
        next: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
#Nav{
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
</style>