<template>
    <div id="FriendlyLinkPage" v-if="friendlyLinks.length !== 0">
        <h1>友情链接</h1>
        <div v-for="({tagName, links}, id) of friendlyLinks" :key="id">
            <h1>{{tagName}}</h1>
            <ul>
                <li v-for="({name, path}, id) of links" :key="id"><a :href="path">{{name}}</a></li>
            </ul>
        </div>
    </div>
    <div class="nothing" v-else>Nothing</div>
</template>

<script>
export default {
    data(){
        return {
            friendlyLinks: []
        }
    },
    methods: {
        async updateFriendlyLinks(){
            let {data: {code, msg, data}} = await this.axios.post(this.apiUrl + "/getFriendlyLinks");
            if(code === 404){
                this.friendlyLinks = [];
            }
            if(code === 200){
                this.friendlyLinks = data;
            }
        }
    },
    created(){
        this.updateFriendlyLinks();
    }
}
</script>

<style lang="less" scoped>
#FriendlyLinkPage{
    padding: 0.3rem 0;
    border-bottom: 1px solid #ddd;
    @media screen and (max-width: 768px){
        padding: 0.1rem 0;
    }
    h1{
        color: #333;
        font: 300 0.32rem "微软雅黑";
    }
    div{
        color: #666;
        h1{
            font-size: 0.16rem;
            margin-top: 0.25rem;
        }
        li{
            margin:  0.1rem 0.3rem;
            a{
                color: #2479CC;
            }
        }
    }
}
</style>