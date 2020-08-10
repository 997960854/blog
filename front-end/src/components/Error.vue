<template>
    <div id="Error">
        <div class="error-bar">
            <router-link to="/" tag="i" title="前往首页" class="icon iconfont icon-404"></router-link>
            <i class="icon iconfont icon-tuya-"><span>404</span></i>
            <span>抱歉，您查看的页面不存在～～</span>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
#Error{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-bar{
        position: relative;
        color: #00a1d6;
        i:first-of-type{
            font: 300 1rem/1 "微软雅黑";
            cursor: pointer;
        }
        i:last-of-type{
            font: 300 1.5rem/1 "微软雅黑";
            position: absolute;
            top: -120%;
            right: -100%;
            span{
                font: 300 0.4rem/1 "微软雅黑";
                position: absolute;
                top: 25%;
                right: 25%;
            }
        }
        & > span{
            position: absolute;
            white-space: nowrap;
            bottom: 0;
            left: 0;
            transform: translate(-23%, 150%);
        }
    }
}
</style>