<template>
    <div id="Main">
        <nav-bar></nav-bar>
        <main class="main-box">
        <header-bar :class="{'move-right': move}"></header-bar>
        <router-view :class="{'move-right': move}"></router-view>
        <footer-bar :class="{'move-right': move}"></footer-bar>
        </main>
    </div>
</template>

<script>
import NavBar from "./NavBar";
import HeaderBar from "./HeaderBar";
import FooterBar from "./FooterBar";
import bus from "../bus/Bus";

export default {
  data(){
    return {
      move: false
    }
  },
  methods: {
      changeMoveVal(){
          bus.$on('changeMove', move => {
              this.move = move;
          });
      },
      changeMoveValReverse(){
          if(this.move){
            this.move = false;
            bus.$emit('changeMoveReverse',false);
          }
      }
  },
  components: {
    NavBar,
    HeaderBar,
    FooterBar
  },
  mounted(){
    this.changeMoveVal();
    document.documentElement.addEventListener("click",this.changeMoveValReverse);
  },
  watch: {
    "$route.params": function(newVal){
        document.documentElement.scrollTop = 0;
    }
  },
}
</script>

<style lang="less" scoped>
#Main{
    display: flex;
    .main-box{
        overflow-x: hidden;
        box-sizing: border-box;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 2.5rem;
        padding: 0 0.5rem;
        @media screen and (min-width: 769px) and (max-width: 992px){
        margin-left: 0.6rem;
        }
        @media screen and (max-width: 768px){
        margin-left: 0;
        padding: 0.5rem 0.2rem 0;
        & > *{
            transition: transform 0.2s ease-in;
        }
        & > .move-right{
            transform: translateX(2.5rem);
        }
        }
        & > :nth-child(2){
        flex-grow: 1;
        }
    }
}
</style>