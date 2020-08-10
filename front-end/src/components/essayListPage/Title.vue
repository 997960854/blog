<template>
    <div class="title">
        <router-link :to='{name: "essay", params: {id}}' tag="h1">{{title}}</router-link>
        <div class="meta">
            <div>
                <span class="author">{{author}}</span>
                <span>发布于</span>
                <span class="date">{{createTime| timeFormat}}</span>
            </div>
            <div>
                <span class="comment">{{commentCount| countFormat}}</span>
                <span>comments</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        createTime: {
            type: Number,
            required: true
        },
        commentCount: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>

</style>