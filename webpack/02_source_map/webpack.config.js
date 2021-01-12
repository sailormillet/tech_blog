module.exports = {
    entry: './src/index.js',
    mode: 'development',
    // devtool: 'none',
    // devtool: 'eval',
    devtool: 'eval-source-map',
    // devtool: 'eval-cheap-source-map',
    // devtool: 'eval-cheap-module-source-map',
    // devtool: 'source-map',
    // devtool: 'cheap-source-map',
    // devtool: 'cheap-module-source-map',
    // devtool: 'inline-source-map',
    // devtool: 'inline-cheap-source-map',
    // devtool: 'inline-cheap-module-source-map',
    // devtool: 'hidden-source-map',
    // devtool: 'nosources-source-map',
    devServer: {
        contentBase: 'dist',
        open: true,
        hot: true
    },
    output: {
        filename: "source-map.main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}