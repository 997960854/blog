<template>
    <header id="HeaderBar" class="ptr">
        <ul @click.stop :class="{'rotate': move}" @click="showNavBar()"><li :class="{'op-0': move}"></li></ul>
        <router-link to="/" tag="h1" title="首页">yxlwq前端博客</router-link>
        <router-link to="/" tag="div" title="我的博客"><img src="../assets/img/profile-logo.png" alt="图片加载失败"></router-link>
    </header>
</template>

<script>
import bus from "../bus/Bus";

export default {
    data(){
        return {
            move: false
        }
    },
    methods: {
        showNavBar(){
            this.move = !this.move;
            bus.$emit("changeMove",this.move);
        },
        changeMoveValReverse(){
            bus.$on("changeMoveReverse",move => {
                this.move = move;
            });
        }
    },
    mounted(){
        this.changeMoveValReverse();
    }
}
</script>

<style lang="less" scoped>
#HeaderBar{
    @media screen and (min-width: 769px){
        display: none;
    }
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #323436;
    ul{
        width: 0.5rem;
        height: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before, &::after, li{
            transition: all 0.2s linear;
        }
        &::before, &::after{
            content: "";
            position: absolute;
            left: 0.14rem;
            width: 0.22rem;
            height: 1px;
            background-color: #999;
        }
        &::before{
            top: 0.17rem;
        }
        &::after{
            bottom: 0.17rem;
        }
        &.rotate::before, &.rotate::after{
            width: 0.272rem;
            left: 0.088rem;
            transform-origin: right;
        }
        &.rotate::before{
            transform: rotateZ(-33deg);
        }
        &.rotate::after{
            transform: rotateZ(33deg);
        }
        li{
            width: 0.22rem;
            height: 1px;
            background-color: #999;
            &.op-0{
                opacity: 0;
            }
        }
    }
    h1{
        font-size: 0.16rem;
        color: #999;
    }
    div{
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.1rem;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}
</style>