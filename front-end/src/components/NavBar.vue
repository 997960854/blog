<template>
    <nav id="NavBar" :class="{'move-right': move}" @click.stop>
        <div class="profile">
            <router-link to="/" tag="div" title="我的博客"><img src="../assets/img/profile-logo.png" alt="图片加载失败"></router-link>
            <span>yxlwq前端博客</span>
        </div>
        <ul class="link-group ptr">
            <router-link :to="path" :title="title" tag="li" v-for="({iconClass, name, path, title}, id) of links" :key="id">
                <i class="iconfont" :class="iconClass"></i>
                <span>{{name}}</span>
            </router-link>
        </ul>
        <div class="other-link-group ptr">
            <a :href="path" :title="title" tag="a" v-for="({iconClass, path, title}, id) of otherLinks.outside" :key="id">
                <i class="iconfont" :class="iconClass"></i>
            </a>
            <router-link :to="path" :title="title" tag="a" v-for="({iconClass, path, title}, id) of otherLinks.inside" :key="id">
                <i class="iconfont" :class="iconClass"></i>
            </router-link>
        </div>
    </nav>
</template>

<script>
import bus from "../bus/Bus";

export default {
    data(){
        return {
            move: false,
            links: [
                {iconClass: "icon-home", name: "首页", path: "/", title: "首页"},
                {iconClass: "icon-guidang", name: "归档", path: "/archives", title: "归档"},
                {iconClass: "icon-biaoqian", name: "标签", path: "/tags", title: "标签"},
                {iconClass: "icon-guanyuwomen", name: "关于", path: "/aboutMe", title: "关于"},
                {iconClass: "icon-youqinglianjie", name: "友链", path: "/friendlyLink", title: "友链"},
            ],
            otherLinks: {
                outside: [{iconClass: "icon-github", path: "http://www.baidu.com", title: "首页"}],
                inside: [{iconClass: "icon-chazhao", path: "/search", title: "搜索文章"}]
            },
        }
    },
    methods: {
        changeMoveVal(){
            bus.$on('changeMove', move => {
                this.move = move;
            });
        },
        changeMoveValReverse(){
            bus.$on("changeMoveReverse",move => {
                this.move = move;
            });
        }
    },
    mounted(){
        this.changeMoveVal();
        this.changeMoveValReverse();
    }
}
</script>

<style lang="less" scoped>
#NavBar{
    position: fixed;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 100vh;
    color: white;
    overflow-y: auto;
    &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-image: url("../assets/img/navbar-bgc.jpg");
        background-size: cover;
        filter: brightness(0.5);
    }
    @media screen and (min-width: 769px) and (max-width: 992px){
        width: 0.6rem;
    }
    @media screen and (max-width: 768px){
        transform: translateX(-100%);
        transition: transform 0.2s ease-in;
        &.move-right{
            transform: translateX(0);
        }
    }
    .profile{
        padding: 0.4rem 0 0.1rem 0;
        @media screen and (min-width: 769px) and (max-width: 992px){
            padding-top: 0.2rem;
        }
        img{
            display: block;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 50%;
            margin: 0 auto;
            cursor: pointer;
            @media screen and (min-width: 769px) and (max-width: 992px){
                width: 0.4rem;
                height: 0.4rem;
            }
            @media screen and (max-width: 768px){
                width: 1rem;
                height: 1rem;
            }
        }
        span{
            display: block;
            text-align: center;
            padding: 0.1rem 0;
            font-size: 0.18rem;
            @media screen and (max-width: 992px){
                display: none;
            }
        }
    }
    .link-group{
        padding-bottom: 0.2rem;
        @media screen and (min-width: 769px) and (max-width: 992px){
            padding-bottom: 0;
        }
        li{
            padding: 0.15rem 0 0.15rem 0.25rem;
            transition: background-color 0.2s ease-in;
            &:hover{
                background-color: rgba(255, 255, 255, 0.158);
            }
            @media screen and (min-width: 769px) and (max-width: 992px){
                padding: 0.15rem 0;
                text-align: center;
            }
            i{
                font-size: 0.18rem;
            }
            span{
                padding-left: 0.2rem;
                @media screen and (min-width: 769px) and (max-width: 992px){
                    display: none;
                }
            }
        }
    }
    .other-link-group{
        padding-left: 0.15rem;
        @media screen and (min-width: 769px) and (max-width: 992px){
            padding-left: 0;
        }
        a{
            display: inline-block;
            color: white;
            padding: 0.1rem;
            transition: background-color 0.2s ease-in;
            &:hover{
                background-color: rgba(255, 255, 255, 0.158);
            }
            @media screen and (min-width: 769px) and (max-width: 992px){
                display: block;
                padding: 0.15rem 0;
                text-align: center;
            }
            i{
                font-size: 0.2rem;
            }
        }
    }
}
</style>