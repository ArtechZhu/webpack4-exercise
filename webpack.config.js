const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var config={
    // 1. 入口：entry
    entry:{
        index:"./src/index.js",
        index2:"./src/index2.js",
    },
    // 2. 出口：output
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].bundle.js"
    },
    // 3. 加载器：loaders
    module:{
        rules:[]
    },
    // 4. 插件：plugins
    plugins:[
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            //模板地址
            template:"./src/index.html", 
            //页面标题
            //head>title，需要在对应的模板页面中使用ejs语法：<title><%= htmlWebpackPlugin.options.title%></title>
            title:"here is index's title",
            //消除缓存
            hash:false,
            //压缩输出
            //OBJECT,选项见此：https://github.com/kangax/html-minifier#options-quick-reference
            minify:{
                collapseWhitespace:false,
                removeAttributeQuotes:false
            },
            //生成多个页面
            filename:"index.html",
            //指定引入打包的块，即多页面分别按需引入js文件
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            //模板地址
            template:"./src/index2.html", 
            //页面标题
            //head>title，需要在对应的模板页面中使用ejs语法：<title><%= htmlWebpackPlugin.options.title%></title>
            title:"here is index22222's title",
            //消除缓存
            hash:false,
            //压缩输出
            //OBJECT,选项见此：https://github.com/kangax/html-minifier#options-quick-reference
            // minify:{
            //     collapseWhitespace:true,
            //     removeAttributeQuotes:true
            // },
            filename:"index2.html"
        })
    ],
    // 5. 开发服务器：devServer
    devServer:{

    },
    // 6. 模式：mode
    mode:"development"
}

module.exports = config;

