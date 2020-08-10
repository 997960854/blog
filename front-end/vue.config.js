module.exports = {
    publicPath: "./",
    configureWebpack: config => {
        config.externals = {
            "vue": "Vue",
            "vue-router": "VueRouter",
            "axios": "axios",
            "markdown-it": "markdownit",
            "highlight.js": "hljs"
        }
    }
}
