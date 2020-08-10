import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import App from "./App.vue"
import Main from "./components/Main.vue";
import "./assets/font/iconfont.css";
import "./assets/less/base.less";
import "./assets/less/md.less";
import { apiUrl } from "./baseConfig";
// import "./mock/mock";

Vue.directive("md", (el, {value}) => {
    let md = new markdownit({
      html: true
    });
    el.classList.add("md-active");
    el.innerHTML = md.render(value);
    el.querySelectorAll("code").forEach(block => {
      hljs.highlightBlock(block);
    });
});

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.apiUrl = apiUrl;

Vue.use(VueRouter);

let routes = [
  {path: "/", component: Main, children: [
    {path: "page/:page", name: "page", component: () => import("./components/essayListPage/EssayListPage.vue")},
    {path: "index", alias: "/", redirect: "/page/1"},
    {path: "essay/:tagName/:id", name: "essay", component: () => import("./components/essayDetailPage/EssayDetailPage.vue")},
    {path: "archives", component: () => import("./components/essayArchives/EssayArchives.vue")},
    {path: "tags", component: () => import("./components/essayTags/EssayTags.vue")},
    {path: "tag/:tagName/:page", name: "tag", component: () => import("./components/essayTagDetailPage/EssayTagDetailPage.vue")},
    {path: "friendlyLink", component: () => import("./components/friendlyLinkPage/FriendlyLinkPage.vue")},
    {path: "aboutMe", component: () => import("./components/aboutMePage/AboutMePage.vue")},
  ]},
  {path: "*", component: () => import("./components/Error.vue")}
];
let router = new VueRouter({
  routes
});

Vue.filter("timeFormat", function(time){
  if(!time){
    return time;
  }
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let date = new Date(time).getDate();
  return `${month}月${date}, ${year}`;
});
Vue.filter("countFormat", function(count){
  if(!count){
    return count;
  }
  function format(count, base){
      let arr = [];
      while(1){
          if(count < base){
              arr.unshift(count);
              return arr.join(",");
          }else{
              arr.unshift(count % base);
              count = Math.floor(count / base);
          }
      }
  }
  return format(count, 1000);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
