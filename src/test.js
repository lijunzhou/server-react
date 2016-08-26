/**
 * Created by zhoulijun on 16/8/17.
 */
"use strict"
//
const co = require("co");
//require("babel-polyfill");

co(function* (next) {

    const load = function () {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve("aaaaa");
            }, 1)
        })

    }
    try{
        var result = yield load().then(msg=>{
            next(msg);
        });
        console.log(result);
    }catch(e){
        console.log(e);
    }
    return result;
}).then(function (value) {
    console.log(value);
}, function (err) {
    console.error(err.stack);
});

//const loadData = function () {
//    return new Promise((resolve,reject)=> {
//        let r = 0;
//        const gen = function*() {
//            try{
//                yield load();
//                yield load2();
//                resolve(r);
//            }catch(e){
//                reject(e);
//            }
//
//        }
//        const load = ()=>{
//            setTimeout(function () {
//                r = Math.random();
//                g.next();
//            },1000);
//        }
//        const load2 = ()=>{
//            setTimeout(function(){
//                r = r * 10000;
//                g.throw(new Error("on error"));
//                g.next();
//            },10);
//        }
//        var g = gen();
//        g.next();
//    })
//}
//
//loadData().then(r=> {
//    console.log(r);
//},e=>{
//    console.log(e);
//});
//
//Promise.resolve("aaa").then(function(msg){
//    console.log(msg);
//})