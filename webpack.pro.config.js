/**
 * Created by zhoulijun on 2015/12/27.
 */
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var fsCopy = require("./fs-copy.js");
////定义配置文件 使用开发时配置文件
fsCopy.copy("config/env.pro.js","src/env.js");
module.exports = {
    entry : {
        demo : [
            "src/client/demo/demo.js"
        ]
    },
    output : {
        path : "dist/public",
        filename : "[name].js",
        publicPath : "/"
    },
    module : {
        loaders : [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap"
            )},
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
    //sdsa这里定义CDN引用
    externals:{
        react : "React",
        moment : "moment",
        'react-dom' : "ReactDOM",
    },
    plugins : [
        new ExtractTextPlugin("[name].css", {
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename : __dirname + "/dist/server/view/app.ejs",
            template : "./template/ejs.html",
            hash : true,
            chunks : ["demo"],
            minify : {
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ]
};