module.exports = {
    entry: './src/index0.js',
    mode: 'development',
    devServer: {
        contentBase: './dist',//为./dist目录中的静态页面文件提供本地服务渲染 
        open: true,//启动服务后自动打开浏览器网页 
    }
}