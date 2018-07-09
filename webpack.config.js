const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const devMode = false;//process.env.NODE_ENV == 'production'

// const webpackEntryJson = require("./webpack.entry.json");


var config = {
    // 1. 入口：entry
    entry: {
        p_index: "./src/index.js",
        p_index2: "./src/index2.js",
        jquery:"jquery"
    },

    // externals:{
    //     "jquery":"window.jQuery"
    // },
    // 2. 出口：output
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.[hash].js",
    },
    // 3. 加载器：loaders
    module: {
        rules: [
            {
                test: /\.css$/,
                // use:["style-loader","css-loader"]  //1
                // loader:["style-loader","css-loader"] //2
                // use:ExtractTextWebpackPlugin.extract({
                //     fallback:'style-loader',
                //     use:'css-loader'
                // })
                use: [
                    {
                        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.scss$/,
                // use: [
                //     "style-loader", // creates style nodes from JS strings
                //     "css-loader", // translates CSS into CommonJS
                //     "sass-loader" // compiles Sass to CSS
                // ]
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: "./postcss.config.js"
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            fallback: "file-loader",
                            limit: 100,
                            outputPath: "imgs/",
                            publicPath: "../imgs/"
                        }
                    }

                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    // 4. 插件：plugins
    plugins: [
        new webpack.ProvidePlugin({
            "$":"jQuery"
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        // new ExtractTextWebpackPlugin('css/index.css'),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            //模板地址
            template: "./src/index.html",
            //页面标题
            //head>title，需要在对应的模板页面中使用ejs语法：<title><%= htmlWebpackPlugin.options.title%></title>
            title: "here is index's title",
            //消除缓存
            hash: true,
            //压缩输出
            //OBJECT,选项见此：https://github.com/kangax/html-minifier#options-quick-reference
            minify: {
                collapseWhitespace: false,
                removeAttributeQuotes: false
            },
            //生成多个页面
            filename: "index.html",
            //指定引入打包的块，即多页面分别按需引入js文件
            chunks: ["p_index"]
        }),
        new HtmlWebpackPlugin({
            //模板地址
            template: "./src/index2.html",
            //页面标题
            //head>title，需要在对应的模板页面中使用ejs语法：<title><%= htmlWebpackPlugin.options.title%></title>
            title: "here is index22222's title",
            //消除缓存
            hash: true,
            //压缩输出
            //OBJECT,选项见此：https://github.com/kangax/html-minifier#options-quick-reference
            // minify:{
            //     collapseWhitespace:true,
            //     removeAttributeQuotes:true
            // },
            chunks: ["p_index2"],
            filename: "index2.html"
        })
    ],
    // 5. 开发服务器：devServer
    devServer: {
        //1.设置服务器要访问的基本目录
        contentBase: path.resolve(__dirname, "dist"),
        //2.设置服务器ip地址
        host: 'localhost',
        //3.设置端口
        port: 8090,
        //4.运行的时候自动打开浏览器，也可以直接在命令行加上 "--open"
        open: false,
        //更新时候自动刷新
        inline: true,
        //开启HMR
        hot: true
    },
    // 6. 模式：mode
    mode: "development",
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    }
}

module.exports = config;

