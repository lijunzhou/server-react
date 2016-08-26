/**
 * Created by zhoulijun on 16/8/24.
 */
"use strict"
var path = require("path");
var koa = require('koa');
var render = require('koa-ejs');

var app = koa();
render(app, {
    root: path.join(__dirname, 'test'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false,
    debug: true,
    open: "{{",
    close: "}}"
});

app.use(function *() {
    yield this.render('app',{title : "koa_ejs",html : "<p>KOA EJS</p>"});
});

app.listen(7001);