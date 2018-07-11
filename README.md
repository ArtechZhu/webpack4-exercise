# webpack4-exercise

webpack4-exercise：常用插件、loaders，devServer，优化等 demo

----

# 1.webpack是什么

打包工具（模块打包）

- 打包样式

- 打包静态资源
- 打包脚本
- 打包图片

---

# 2.webpack作用

1. 打包（把多个文件打包成一个js文件--->减少服务器压力、带宽）

2. 转化（eg：less，sass，ts），通过各个loaders

3. 优化（webpack可以对项目进行优化）

---

# 3.webpack 构成

       	1. 入口：entry
       	2. 出口：output
       	3. 加载器：loaders
       	4. 插件：plugins
       	5. 开发服务器：devServer
       	6. 模式：mode

---

# 4.项目文件夹初始化

1. 创建src文件夹

2. 初始化package.json

   ```sh
   npm init -y
   ```

------

# 5.npm **包安装**

```sh
npm install {包名}@{版本号} [--save-dev]
简写：npm i
--save-dev（-D）：开发环境，也就是生产环境用不上的包，如webpack-dev-server
--save（-S）：生产环境，也就是说生产环境也需要使用的包，如jquery包
```

-----

# 6.**webpack**

## 6.1.安装webpack，webpack-cli

```sh
npm install webpack@4.14.0 webpack-cli@0.0.8-development -D
```

## 6.2.使用

```sh
npx webpack ./src/index.js --output ./dist/bundle.js
```

## 6.3.demo

```sh
1. 在项目中新建 dist目录
2. 在目录中新建一个index.html，并引用 bundle.js
3. 在打包生成之后，浏览器打开index.html
以上打包方式，每次打这么多的命令，omg
```

## 6.4.使用webpack.config.js

直接讲下面的点复制到IDE中进行说明

<a href="#webpack 构成">按住ctrl点击跳转 webpack 构成</a> 

```sh
var config={
    // 1. 入口：entry
    entry:{

    },
    // 2. 出口：output
    output:{

    },
    // 3. 加载器：loaders
    module:{
        rules:[]
    },
    // 4. 插件：plugins
    plugins:[

    ],
    // 5. 开发服务器：devServer
    devServer:{

    },
    // 6. 模式：mode
    mode:""
}
```

## 6.5.demo：将npx webpack ./src/page/index/index.js --output ./dist/bundle.js以配置文件的形式来进行处理

```sh
    // 1. 入口：entry
    entry:{
        index:"./src/index.js"
    },
    // 2. 出口：output
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js"
    },
```

## 6.6.如何使用其他名字的webpack.config.js

```sh
如自定义的配置js名称为：mywebpack.config.js，则使用方式为：
	npx webpack --config mywebpack.config.js
```

---

# 7.webpack 的零配置

Webpack4 增加了零配置，用于反击parcel，因而有约定默认文件夹和文件命名要求，以实现零配置。

零配置demo 

```sh
1.注释掉webpack.config.js内容
2.直接运行 npx webpack      会报错
3.在src目录下新建index.js
4.再次运行 npx webpack
5.会在dist目录下生成 main.js
```

> 额外说明：上面零配置下最终生成的main.js和package.json中的main属性没有任何关系;
>
> package.json中的main属性指的是“包的接口模块”，或者说是入口函数-----那node_modules文件夹内的随便一个包做下解释。
>
> ​	在使用npm install进行安装包的时候，会根据该包的package.json文件的main属性来找到入口点，以此来下载该安装包的依赖，以及依赖的依赖。。。。以此类推

---

# 8.练习讲解

## 8.1.plugins

### 8.1.1.html-webpack-plugin

*需要注意下，plugin后面没有s*

#### 安装

```sh
npm install -D html-webpack-plugin
```

#### 引用

```c#
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

#### 使用

```swift
    plugins:[
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
```

### 8.1.2.clean-webpack-plugin

#### 安装

```sh
npm install -D clean-webpack-plugin
```

#### 引用

```c#
const CleanWebpackPlugin = require('clean-webpack-plugin');
```

#### 使用

```C#
new CleanWebpackPlugin(["dist"])
```



### 8.1.3.banner-plugin

#### 安装

安装有 webpack即可

#### 引用

```js
const webpack = require('webpack');
```

#### 使用

```js
        new webpack.BannerPlugin({
            banner: "这里是bannerplugin生成的banner：'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'", 
            raw: false, // if true, banner will not be wrapped in a comment
            entryOnly: false, // if true, the banner will only be added to the entry chunks
            // test: string | RegExp | Array,
            // include: string | RegExp | Array,
            exclude: /node_modules/,
        }),
```



## 8.2.devServer

#### 安装

```sh
npm i -D webpack-dev-server
```

#### 配置

```c#
    devServer:{
        //1.设置服务器要访问的基本目录
        contentBase:path.resolve(__dirname,"dist"),
        //2.设置服务器ip地址
        host:'localhost',
        //3.设置端口
        port:8090,
        //4.运行的时候自动打开浏览器，也可以直接在命令行加上 "--open"
        open:true,
        //更新时候自动刷新
        inline:true,
        //开启HMR
        hot:true
    },
```

#### 使用

```sh
运行：npx webpack-dev-server
```

对于HMR，需要在js和webpack.config.js中增加如下代码

```c#
js文件：
if(module.hot){
    module.hot.accept();
}
```

```C#
webpack.config.js文件：
plugins:[
	new webpack.HotModuleReplacementPlugin() //需要先引入webpack
]
```



## 8.3.loaders

加载器，转化器

### 8.3.1.处理CSS

#### 使用css-loader，style-loader

##### 安装

```sh
npm i style-loader css-loader -D
```

##### 配置

```c#
webpack.config.js
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
```

```c#
在js文件中引入css文件
import './src/css/a.css'
```

### 8.3.2.关于loader的写法

```c#
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:["style-loader","css-loader"]  //1
                // loader:["style-loader","css-loader"] //2
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                ]

            }
        ]
    },
```
> 遇到后缀为.css的文件，webpack会先用 css-loader加载器去解析这个文件，遇到 import 等语句就将相应样式文件引入（所以没有css-loader，就没法解析这类语句），最后计算完的css，将会使用 style-loader 生成一个内容为最终解析完的css代码的style标签，放到head标签里。

*P.S.需要注意的是这里加载器在使用的时候，会从右往左一次调用（或者方式2的调用的话就是从下往上）*

> css文件中的内容会被写入到html页面中，渲染的顺序根据在js中import/require的顺序。 

### 8.3.3.处理图片

#### 使用 url-loader，file-loader

[看下webpack官方对于url-loader这个加载器的说明](https://webpack.js.org/loaders/url-loader/)

> file-loader：可以解析项目中的url引入（不仅限于CSS），根据配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

> url-loader：如果页面图片很多，会发很多http请求，会降低页面性能。url-loader会将引入的图片进行编码，生产dataURL。相当于把图片数据翻译成了一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能，因此url-loader提供了一个limit参数，小于limit字节的文件会被转为dataURL，大于limit的还会使用file-loader进行拷贝。 

##### 安装

```sh
npm i -D file-loader url-loader
```

##### 配置

```c#
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
```

### 8.3.4.分离CSS

#### 8.3.4.1.使用 extract-text-webpack-plugin     【webpack4 使用 mini-css-extract-plugin】

##### 安装

```sh
npm i -D extract-text-webpack-plugin
```

##### 引入

```c#
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
```

##### 配置

```c#
plugins：new ExtractTextWebpackPlugin("/css/index.css");
loaders：需要把原先 css-loader和style-loader调整下：
	        {
                test:/\.css$/,
                // use:["style-loader","css-loader"] 
                use:ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
```

***webpack4下，需要安装 extract-text-webpack-plugin@next***

#### 8.3.4.2.使用 mini-css-extract-plugin

##### 安装

```SH
npm install mini-css-extract-plugin -D
```

##### 引用

```c#
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

##### 配置

```c#
plugins:
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),

module.rules:
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            },
```

### 8.3.5.使用less

注意在js中引用less文件

#### 安装

```sh
npm install -D less less-loader
```

#### 配置

```c#
            {
                test: /\.less$/,
                use:[
                    {
                        loader: devMode?"style-loader":MiniCssExtractPlugin.loader,
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
```

#### less语法

```less
@a:red;
@b:white;
#forless {
    font-size: 30px;
    color:@a;
    span{
        color:@b
    }
}
```

### 8.3.6.使用sass

#### 安装

```sh
npm install sass-loader node-sass webpack --save-dev
```

#### 配置

```c#
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {

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
```

#### sass语法

```scss
$a:red;
$b:blue;
#forsass {
    font-size: 30px;
    color:$a;
    span{
        color:$b
    }
}
```

### 8.3.7.前缀处理器 postcss-loader

postcss不是CSS预处理器，也不是后处理器，只是一个"插件工具"，针对postcss有很多实用的。

不装插件的postcss，等于无差 （演示的时候，注意下，页面提供的代码实例，需要删除下，保留plugin部分即可）

[POSTCSS 插件，git文档](https://github.com/postcss/postcss#plugins)

#### 安装

```sh
npm i -D postcss-loader
npm install -D autoprefixer
```

#### 配置

```c#
webpack.config.js 
{
                test: /\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {

                        }
                    },
                    "css-loader",
                    //需要放在css-loader，style-loader等之前运行
                    //但是需要再sass，less等预处理器之后运行
                    'postcss-loader',
                    "sass-loader"
                ]
            }
       

需要自行增加一个配置文件：postcss.config.js
            module.exports = {
                plugins: {
                    'autoprefixer': {},
                }
            }
            //-------------也可以使用require，但是需要plugins的值此时需要用数组------------------
            module.exports = {
                plugins: [
                    require('autoprefixer')
                ]
            }
```

### 8.3.8.消除冗余CSS代码：purifycss

#### 安装

```sh
npm install -D purifycss-webpack purify-css
```

#### 引用

```c#
const PurifyCSSPlugin = require('purifycss-webpack');
```

> 需要引入一个额外的包：glob
>
> 安装： npm i -D glob
>
> 引入：const glob = require('glob');

#### 配置

```
new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'app/*.html')),
    })
```

### 8.3.9.babel-loader ：使用最新8.X版本（beta）

> - babel：是一个ES6转码器，可以将ES6代码转换为ES5代码，从而在现有环境执行，这意味着，你可以用ES6的方式编写程序，又不用担心现有环境知否支持。
>
> - babel有3个阶段：解析 ---> 转换 ---> 生成 
>
> - babel-loader：加载器，同其他loader一样，实现对特定文件类型的处理。（webpack本身能够处理.js文件（自身只理解JavaScript），但无法对ES2015+的语法进行转换，babel-loader的作用正是对使用了ES2015+的语法的.js文件进行处理） 
>
> - babel-core：作用在于提供一系列的api，也就是说，当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api，因此也必须安装babel-core。

#### 安装

```sh
npm install "babel-loader@next" @babel/core @babel/preset-env -D
```

#### 配置

```c#
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
            }
```

#### 使用

```c#
var result = [4,5,6].map(n=>n**2);
console.log("index.js:result=%o",result);
```



# 9.模块

## 9.1 模块导出

```js
webpack.rules.js
var rules = {};
module.exports = rules;
```

> 模块导出方法：module.exports = {变量/函数/其他}
>
> 导出的是变量，那么在使用（require）的时候就是变量；导出的是函数，那么在require的时候就是函数

## 9.2 模块实用

```js
webpack.config.js
const rules = require("./webpack.rules.js"); //需要使用相对路径的形式来引用，否则会作为node的包来查找
直接在webpack的配置中替代原先的rules
modules:rules,
```

# 10. JSON的使用（git新分支@json-demo）

在webpack 3.X之前，使用json需要引入 "json-loader"，从webpack3.X开始，webpack不再需要引入该包。

> 这里有个注意事项，对于json文件，在webpack.config.js中使用的时候，只能通过require的形式来导入，而在其他业务js文件中，可以通过require，也可以通过import

```JS
webpack.config.js：
const json = require('./myJson.json')

其他业务js：除了上面的方式外，还可以用import
import json from './myJson.json';
```



# 11. 第三方插件

## 11.1.使用第三方插件（git新分支@thirdplugin-demo）

方法有：

​	1.直接在js中通过require的方式来使用

​	2.通过externals来引用，但需要在页面上通过CDN来引用

​	3.在webpack.config.js中，通过webpack.ProvidePlugin({})插件来配置使用，但依然需要先安装包，但不再需要require这个包。

> 个人建议：
>
> 对于单个功能页面用到的第三方js库，可使用第一种方式
>
> 对于提供CDN包的js，建议使用第二种方式
>
> 对于需要全局使用的js，建议第三种
>
> - 第一种和第二种方式 的差异：
>   - 如果在业务js中 进行了require第三方库，则不管有没有用到该库，该库都会被打包到业务js块中；
>   - 如果通过第三种方式引入的包（因为业务js不再需要require），则只要该业务js中没有用到该库，该库就不会被打包到该业务js块中去。
> - ***如果在webpack.config.js中写了 externals，则使用的包仅为cdn下的（即不会引用本地包-->也就是该第三方包不会打包到业务js中）***

安装包（jquery为例）

```sh
npm install -D jquery@1.12.4
```

方式1：直接在js中通过require引用，之后就可以用$这个符号来表示jQuery了

```js
const $ = require('jquery');
```



方式2：通过cdn引用+配置externals

```js
webpack.config
    externals:{
        "jquery":"jQuery" //注意大小写，值是"jQuery"(或者"window.jQuery")
    },
```



方式3：配置webpack.config.js

```js
Plugins：
        new webpack.ProvidePlugin({
            "$":"jquery"
        }),
```

## 11.2.提取第三方js库（或者自己写的库）

> 在webpack3.x 使用 CommonChunksPlugin，在4.x开始，使用 splitChunksPlugin

### webpack.config中使用 splitChunksPlugin

```js
config.optimization属性中进行配置:
    optimization: {
        splitChunks: {
            //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            //chunks:'initial' (初始块：只对入口块做处理)
            chunks: 'async',
            //表示在压缩前的最小模块大小，默认为0，单位：byte；
            minSize: 30000,//这里表示 30Kb
            //表示被引用次数，默认为1
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为1；
            maxAsyncRequests: 5,
            //最大的初始化加载次数，默认为1；
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            //拆分出来块的名字(Chunk Names)，默认(true)由块名和hash值自动生成；
            name: true,
            //缓存组（可以覆写splitChunks.*中的配置）
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
```



---

# Q：这里生成的js文件是没有压缩过的，那么怎么样可以压缩？

```sh
npx webpack --mode production
这个是在webpack 4.x版本中开始
```

大家有没有看到过uglifyjs-webpack-plugin这个插件？一般现在网上，尤其是百度，你能搜索到的很多关于react、vue、webpack的，都会有这么个插件，

***4.X版本开始，我们没有必要再用这个插件，当然，如果你要用也没关系，简单说明下***

## 安装

```sh
npm install -D uglifyjs-webpack-plugin
```

## 引用

```sh
const UglifyjsWebpackPlugin= require('uglifyjs-webpack-plugin');
```

## 配置

```c#
plugins中增加：new UglifyjsWebpackPlugin(),
```








