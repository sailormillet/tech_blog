# runtime
### 何为运行时代码？
>import('abc').then(res=>{})这种异步加载的代码，在webpack中即为运行时代码。
### 什么是runtime
>runtimeChunk作用是为了做优化持久化缓存，线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低，提升用户体验。


### webpack的运行时的内容，包括:

- webpack如何编译源码里的import和import()
- webpack如何将chunk加载到浏览器并执行
- webpack如何组织bundle、chunk和module

```
yarn add webpack webpack-dev-server path html-webpack-plugin -D
```

### 配置runtimeChunk，提取运行时代码
```

module.exports = {
    optimization: {
        // 将所有 chunk 的运行时提取到单个文件里公用，该文件默认名为 runtime
        runtimeChunk: 'single'
    }
}
```

### 打包后的html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body>
  <script src="/runtime.js"></script><script src="/app.js"></script></body>
</html>
```
看到runtime.js会第一个加载执行，其次才是app.js,看来app.js的执行依赖runtime.js，而async.js会在需要时候异步加载。

客户端执行window["webpackJsonp"]即可看到所有的chunk 以及modules 和executeModules 

### webpack是如何处理源代码里的import和import()

#### import 的编译
sync.js 编译前
```
export const A = 'A'
export const a = 'a'
```
sync.js 编译后 app.js 里 moduleId 为 rPIt 的模块函数
```
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
const A = 'A'
const a = 'a'

})
```
编译后，引用并调用sync模块的代码为
```
(function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("rPIt");

console.log(_sync__WEBPACK_IMPORTED_MODULE_0__["A"])
})
```

其中__webpack_require__("bhxd")会执行模块函数，返回的模块结果对象最终有两个访问器属性，A和a:
```
{
  // 访问器器属性名称: 属性描述符
  A: {
    enumerable: true,
    get: function() { return 'A'; }
  },
  a: {
    enumerable: true,
    get: function() { return 'a'; }
  }
}
```
syncdefault.js 编译前
```
export default function () {
  console.log('b')
}
```
syncdefault.js  编译后 app.js 里 moduleId 为 dPJ9 的模块函数
```
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
    console.log('b')
});
```
syncdefault.js 编译后，引用并且调用模块的代码为
```
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _syncdefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("dPJ9");

Object(_syncdefault__WEBPACK_IMPORTED_MODULE_1__["default"])()


})
```
其中__webpack_require__("dPJ9")会执行模块函数，返回的模块结果对象有一个default方法:
```
{
  default: function () {
    console.log('b')
  }
}
```
#### import() 的编译

async.js 编译前
```
export default 'C'
```
```
// index.js 里，异步引入并调用 async 模块
import(/* webpackChunkName: "async" */ './async').then(content => {
    console.log('module async: ', content)
})
```
编译后，c模块会被打包成一个单独的bundle，仅包含了async模块:
```
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "TSF4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('c');

/***/ })

}]);
```
async.js 编译后，引用并且调用模块的代码为
```
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.e(/* import() | async */ 1).then(__webpack_require__.bind(null, "TSF4")).then(content => {
    console.log('module async: ', content)
})
})
```
其中__webpack_require__.e是将 ID 为2的chunk所在的bundle异步加载到浏览器里（这个我们之后会详细说明）。bundle加载好之后，调用__webpack_require__("TSF4")会执行模块函数，返回的模块结果对象有一个default方法:
```
{
  default: 'C'
}
```

## import VS import()

>import和import()引入模块，其区别仅在于import()会先通过__webpack_require__.e异步加载到浏览器里。


## script-ext-html-webpack-plugin
```
yarn add script-ext-html-webpack-plugin -D
```
```
plugins: [
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime~.+\.js$/  //正则匹配runtime文件名
      })
    ]
```