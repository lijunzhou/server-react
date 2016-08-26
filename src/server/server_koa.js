/**
 * Created by zhoulijun on 16/8/1.
 */
"use strict";
require("babel-polyfill");
let app = require('koa')();
const views = require("co-views");
const path = require("path");
const Constants = require("../env.js");
const demoService = require("./services/demo_service");
const controllerLoader = require("./controllers/loader.js");
var render = views(Constants.views , {
    ext: "ejs",
    locals: {
        close: '}}',
        open: '{{'
    }
});

app.use(function* (next) {
    try {
        yield* next;
    } catch(e) {
        let status = e.status || 500;
        let message = e.message || '服务器错误';

        this.status = status;
        // 根据 status 渲染不同的页面
        if (status == 403) {
            this.body = yield this.render('403.html', {'err': e});
        }
        if (status == 404) {
            this.body = yield this.render('404.html', {'err': e});
        }
        if (status == 501) {
            this.body = yield render('501.ejs', {'err': e});
            // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
            this.app.emit('error', e, this);
        }
        console.log(status);
        if(status == 500){
            this.body = yield render('501.ejs', {'err': e});
        }
    }
});

controllerLoader.load(app,render);

module.exports = {
    app: app,
    start: ()=> {
        app.listen(3000);
        console.log("listen 3000")
    }
}