module.exports = {
    entry: './src/index2.js',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                //使用 style-loader 和 css-loader 来解析导入的 CSS 文件。
                //其中 css-loader 处理的是将导入的 CSS 文件转化为模块供后续 Loader 处理；
                //而 style-loader 则是负责将 CSS 模块的内容在运行时添加到页面的 style 标签中。
            }
        ]
    }
}