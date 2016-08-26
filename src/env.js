/**
 * Created by zhoulijun on 16/3/25.
 */
"use strict";
const path = require("path");


module.exports = {
    INTERFACE_URL : "http://172.18.1.209", //接口请求路径
    debug : 1,
    dev:true,
    context : "",
    views : path.join(__dirname , "../src/server/views")
}
