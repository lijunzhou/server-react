/**
 * Created by zhoulijun on 16/8/26.
 */
"use strict"

module.exports = {
    path : "/error",
    controller : (app,render)=>{
        return function* (next) {
            this.throw(501,new Error("没有权限"))
        }
    }
}