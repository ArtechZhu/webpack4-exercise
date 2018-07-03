# webpack4-exercise

webpack4-exercise：常用插件、loaders，devServer，优化等 demo

----

# webpack是什么

打包工具（模块打包）

- 打包样式

- 打包静态资源
- 打包脚本
- 打包图片

# webpack作用

1. 打包（把多个文件打包成一个js文件--->减少服务器压力、带宽）

2. 转化（eg：less，sass，ts），通过各个loaders

3. 优化（webpack可以对项目进行优化）


# webpack 构成

       	1. 入口：entry
       	2. 出口：output
       	3. 加载器：loaders
       	4. 插件：plugins
       	5. 开发服务器：devServer
       	6. 模式：mode

# 项目文件夹初始化

1. 创建src文件夹

2. 初始化package.json

   ```sh
   npm init -y
   ```

------

# npm **包安装**

```sh
npm install {包名}@{版本号} [--save-dev]
简写：npm i
--save-dev（-D）：开发环境，也就是生产环境用不上的包，如webpack-dev-server
--save（-S）：生产环境，也就是说生产环境也需要使用的包，如jquery包
```

-----

# **webpack**

## 安装webpack，webpack-cli

```sh
npm install webpack@4.14.0 webpack-cli@0.0.8-development -D
```

## 使用

```sh
npx webpack ./src/index.js --output ./dist/bundle.js
```

## demo

```sh
1. 在项目中新建 dist目录
2. 在目录中新建一个index.html，并引用 bundle.js
3. 在打包生成之后，浏览器打开index.html
以上打包方式，每次打这么多的命令，omg
```

## 使用webpack.config.js

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

## demo：将npx webpack ./src/page/index/index.js --output ./dist/bundle.js以配置文件的形式来进行处理

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

## 如何使用其他名字的webpack.config.js

```sh
如自定义的配置js名称为：mywebpack.config.js，则使用方式为：
	npx webpack --config mywebpack.config.js
```

# webpack 的零配置

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



# 练习讲解

## plugins

### html-webpack-plugin

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

---

### clean-webpack-plugin

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



## devServer



## loaders

### 