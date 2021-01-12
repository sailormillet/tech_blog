const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'none',
    entry: {
        app: './src/index.js'
    },
    devServer: {
        contentBase: 'dist',
        open: true
    },
    output: {
        //出口文件的名称
        filename: '[name].[chunkhash].js',
        // filename: '[name].js',
        //出口文件的路径
        path: path.resolve(__dirname, 'dist'),
        //publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
        publicPath: '/'
    },
    plugins: [
        // 以模块的相对路径生成一个四位数的 hash 作为模块 id，而不是以引入顺序的数字作为模块 id
        //HashedModuleIdsPlugin，推荐用于生产环境构建：使用这个可以实现缓存，那些没有改变的文件就不会
        //随着每次构建而改变了，节约资源
        new webpack.HashedModuleIdsPlugin(),
        // 生成 html 文件
        // new HtmlWebpackPlugin({
        //     filename: 'template/index.html',
        //     chunks: ['app']
        // })
        new HtmlWebpackPlugin()
    ],
    optimization: {
        // 将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个只含有 runtime 的入口添加一个额外 chunk。此配置的别名如下：
        // runtimeChunk: true,
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        }
        // runtimeChunk: 'single'值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件。此设置是如下设置的别名：
        // runtimeChunk: {
        //     name: 'runtime'
        //   }

    }
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         use: {
    //             loader: 'babel-loader',
    //             options: {
    //                 presets: ['@babel/preset-env']
    //             }
    //         }
    //     }],
    // }
}