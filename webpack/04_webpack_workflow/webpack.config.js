const HelloWordPlugin = require('./HelloWordPlugin')
module.exports = {
    mode: 'none',
    // watch:true,
    // devServer: {
    //     contentBase: 'dist',
    //     open: true,
    //     hot: true
    // },
    entry: './src/index.js',
    plugins: [
        new HelloWordPlugin()
    ],
    // optimization:{
    //     runtimeChunk: true
    // }
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         loader: 'babel-loader',
    //         use: [{
    //             presets: ['@babel/preset-env']
    //         }]
    //     }]
    // }
}