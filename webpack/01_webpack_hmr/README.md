# webpack_hmr
### 什么是热更新
>浏览器的热更新，指的是我们在本地开发的同时打开浏览器进行预览，当代码文件发生变化时，浏览器自动更新页面内容的技术。这里的自动更新，表现上又分为自动刷新整个页面，以及页面整体无刷新而只更新页面的部分内容。
>与之相对的是在早期开发流程中，每次代码变更后需要手动刷新浏览器才能看到变更效果的情况。甚至于，代码变更后还需要手动执行打包脚本，完成编译打包后再刷新浏览器。而使用浏览器的热更新，可以大大减少这些麻烦。

### 热更新是保存后自动编译（Auto Compile）吗？还是自动刷新浏览器（Live Reload）？
### 还是指 HMR（Hot Module Replacement，模块热替换）？
### 这些不同的效果背后的技术原理是什么呢？

初始化package.json
```
npm init
```
添加相关包
```
yarn add webpack webpack-dev-server style-loader css-loader -D
```
写scripts执行命令
```
"scripts": {
    "build:basic": "webpack --config webpack.config.basic.js",
    "build:watch": "webpack --config webpack.config.watch.js",
    "dev:reload": "webpack-dev-server --config webpack.config.reload.js",
    "dev:hmr": "webpack-dev-server --config webpack.config.hmr.js",
    "dev:hmr2": "webpack-dev-server --config webpack.config.hmr2.js"
  },
```
#### webpack简单的打包
webpack.config.basic.js
```
module.exports = {
    entry: './src/index0.js',
    mode: 'development'
}
```
#### webpack 中增加了 watch 模式，通过监控源码文件的变化来解决上面不能自动编译问题
webpack.config.watch.js
```
module.exports = {
    entry: './src/index0.js',
    mode: 'development',
    watch:true
}
```
#### Live Reload
第三种配置是 Live Reload。为了使每次代码变更后浏览器中的预览页面能自动显示最新效果而无须手动点击刷新，我们需要`一种通信机制来连接浏览器中的预览页面与本地监控代码变更的进程`。在 webpack 中，我们可以使用官方提供的开发服务器来实现这一目的，配置如下：
```
webpack.config.reload.js 
{... 
  devServer: { 
    contentBase: './dist', //为./dist目录中的静态页面文件提供本地服务渲染 
    open: true          //启动服务后自动打开浏览器网页 
  } 
...} 
package.json 
"scripts": { 
  "dev:reload": "webpack-dev-server --config webpack.config.reload.js" 
}
```
在加载完页面和页面中引用的 js 文件后，服务还加载了路径前缀名为 /sockjs-node 的 websocket 链接，如下图：
![websocket](./img/websocket.png)


通过这个 websocket 链接，就可以使打开的网页和本地服务间建立持久化的通信。当源代码发生变更时，我们就可以通过 Socket 通知到网页端，网页端在接到通知后会自动触发页面刷新。

#### HMR（Hot Module Replacement，模块热替换）

在devServer中增加hot:true

### 完整的 HMR 功能主要包含了三方面的技术：
- watch 示例中体现的，对本地源代码文件内容变更的监控。`基于 Node.js 中提供的文件模块 fs.watch 来实现对文件和文件夹的监控`

- instant reload 示例中体现的，浏览器网页端与本地服务器端的 Websocket 通信。`使用 sockjs-node 或 socket.io 来实现 Websocket 的通信`

- hmr 示例中体现的，也即是最核心的，模块解析与替换功能。
主要用到模块热替换插件（HotModuleReplacementPlugin）
`在配置中开启 hot:true 并不意味着任何代码的变更都能实现热替换，除了示例中演示的 style-loader 外， vue-loader、 react-hot-loader 等加载器也都实现了该功能。当开发时遇到 hmr 不生效的情况时，可以优先确认对应加载器是否支持该功能，以及是否使用了正确的配置。`
替换逻辑 hot.accept 方法传入依赖模块名称和回调方法
模块被移除时 hot.dispose 方法则是传入一个回调