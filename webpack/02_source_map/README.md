# SourceMap
### 什么是SourceMap
>将压缩的代码在浏览器调试的时候显示回源码的功能

chrome控制台需要设置`Enable Javascript source map`

- 开发环境构建快，质量高，文件大小和访问方式不重要
- 生产环境生成文件的大小和访问方式对页面性能的影响，质量和速度不是很重要

```
yarn add webpack webpack-dev-server react react-dom babel-loader react-loader @babel/core @babel/preset-env -D
```
@babel/cli
Babel附带了一个内置的CLI，可用于从命令行编译文件。


@babel/core
使用本地配置文件


@babel/preset-env
编译最新版本JavaScript


@babel/preset-react
编译react


@babel/polyfill
通过 Polyfill 方式在目标环境中添加缺失的特性


@babel/plugin-proposal-class-properties
编译 class