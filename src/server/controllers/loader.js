/**
 * Created by zhoulijun on 16/8/25.
 */
"use strict";

const demo = require("./demo.js");
const error = require("./error.js");
const router = require("koa-router")();
const proxy = require("koa-proxy");

module.exports = {
     load : function(app,render){

            router.all("/__data__/*",proxy({
                host : "http://172.18.1.209/",
                map : function(path){
                    return path.replace("/__data__","");
                }
            }));
            router.get(error.path, error.controller(app,render));
            router.get(demo.path, demo.controller(app,render));
            app.use(router.routes()).use(router.allowedMethods());
            return app;
        }
}
