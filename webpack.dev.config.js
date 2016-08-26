/**
 * Created by zhoulijun on 2015/12/27.
 */
var webpack = require("webpack");
var path = require("path");
var fsCopy = require("./fs-copy.js");
//定义配置文件 使用开发时配置文件
//fsCopy.copy("resource/constants.local.js","src/constants.js");
//fsCopy.copy("resource/constants.local.js","dev/client/constants.js");
//fsCopy.copy("resource/constants.local.js","dev/server/constants.js");
module.exports = {
    entry : {
        demo : [
            "./src/client/demo/demo.js",
            "webpack-hot-middleware/client?reload=true"
        ]
    },
    output : {
        path: __dirname + '/build/public/',
        filename: '[name].js',
        publicPath: '/__build__/'
    },
    devtool : "cheap-module-source-map",
    module : {
        loaders : [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/, loader: 'url-loader'},
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve : {
        extensions : ['','.js','.css'],
        alias : {
            view : __dirname + "/src/client/view",
            model : __dirname + "/src/client/model",
            src : __dirname + "/src",
            components : __dirname + "/src/server/components",
            services : __dirname + "/src/server/services"
        }
    },
    externals:{
        //'react' : "React",
        //'moment' : "moment",
        //'react-dom' : "ReactDOM",
        //'react-router' : "ReactRouter",
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};