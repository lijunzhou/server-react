
var express = require('express');
var webpack =  require('webpack');
var config  = require('./webpack.dev.config');
var path = require('path');
var server = require("./dev/server/server_koa.js");
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');

var compiler = webpack(config);
server.app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

server.app.use(webpackHotMiddleware(compiler));

server.start();