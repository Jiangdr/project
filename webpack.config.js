

const webpack = require('webpack');//定义常量
const path = require('path');




//css剥离
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
//CSS输出
const styles = new ExtractTextWebpackPlugin("../css/[name].css");
//CSS压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const cssPress = new OptimizeCssAssetsWebpackPlugin();

// js文件压缩
var compress = new webpack.optimize.UglifyJsPlugin({
    comments: false,//是否保留注释
    sourceMap: true,
    compress: {
        warnings: false//是否保留警告
    }
});



module.exports = {
    devtool: '#cheap-module-source-map',
    context: __dirname + '/js',
    entry: {
        index: './script'
    },
    output: {
        path: path.resolve(__dirname, "js"),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /\.(js|jsc)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(gif|png|jp?g|woff|svg|eot|ttf)\??.*$/,
                loaders: [
                    'url-loader?limit=8000&name=../img/resource/[hash:8].[ext]'
                ]
            }
        ]
    },
    // plugins: [
    //     styles,
    //     compress,
    //     cssPress
    // ]
    plugins: [
        styles
    ]
};

