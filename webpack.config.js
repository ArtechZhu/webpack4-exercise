const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
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
        rules:[
            {
                test:/\.css$/,
                // use:["style-loader","css-loader"]  //1
                // loader:["style-loader","css-loader"] //2
                use:ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test:/\.(jpg|jpeg|png|gif)$/,
                exclude:/node_modules/,
                use:[
   
                    {
                        loader:"url-loader",
                        options:{
                            limit:200,
                        }
                    },
                    {
                        loader:"file-loader",
                        options:{
                            
                            name:"[name].[ext]",
                            outputPath:"img/"
                        }
                    },
                ]
            }
        ]
    },
    // 4. 插件：plugins
    plugins:[
        new ExtractTextWebpackPlugin('css/index.css'),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            //模板地址
            template:"./src/index.html", 
            //页面标题
            //head>title，需要在对应的模板页面中使用ejs语法：<title><%= htmlWebpackPlugin.options.title%></title>
            title:"here is index's title",
            //消除缓存
            hash:true,
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
            hash:true,
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
        //1.设置服务器要访问的基本目录
        contentBase:path.resolve(__dirname,"dist"),
        //2.设置服务器ip地址
        host:'localhost',
        //3.设置端口
        port:8090,
        //4.运行的时候自动打开浏览器，也可以直接在命令行加上 "--open"
        open:false,
        //更新时候自动刷新
        inline:true,
        //开启HMR
        hot:true
    },
    // 6. 模式：mode
    mode:"development"
}

module.exports = config;

