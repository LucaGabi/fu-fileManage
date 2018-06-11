const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        fileManage: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin([
            'dist'
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: '文件管理组件',
            chunks: ['fileManage'],
            template: 'index.html'
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },{
                test: /\.less$/,
                use: [{
                    loader: "style-loader"// creates style nodes from JS strings
                }, {
                    loader: "css-loader"// translates CSS into CommonJS
                }, {
                    loader: "less-loader", // compiles Less to CSS
                    options: { javascriptEnabled: true } 
                }]
            }, {
                test: /\.(png|jpg|gif)$/,// 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                use: [{
                    loader: "url-loader?limit=8192&name=./static/img/[hash].[ext]",// 如下配置，将小于8192byte的图片转成base64码
                }]
            },
        ]
    }
};