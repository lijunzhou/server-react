/**
 * Created by zhoulijun on 16/8/24.
 */
"use strict";
import envTools from "./env_tools.js";

let http;

envTools.isClient(()=>{
    http = require("./client_http.js");
},()=>{
    http = require("./server_http.js");
});

module.exports = http;