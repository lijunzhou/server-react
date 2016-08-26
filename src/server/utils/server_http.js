/**
 * Created by zhoulijun on 16/8/24.
 */
"use strict";
const env = require("../../env.js");

const ResultPromise = function() {
    var beStack = {};

    ResultPromise.prototype.sf = function(data) {
        //定义默认成功处理函数
        //alert("操作成功")
    };
    ResultPromise.prototype.ef = function(data) {
        alert(data);
    };
    ResultPromise.prototype.cf = function() {
        //定义默认的不论成功还是失败都会处理的函数
    };
    ResultPromise.prototype.be = function(data) {
        var becode = data.data.business;
        var msg = data.data.msg;
        if (beStack[becode]) {
            beStack[becode](msg, data.data);
        } else {
            this.ef(data);
        }
    }
    ResultPromise.prototype.success = function(sf) {
        //覆盖默认的成功处理函数
        this.sf = sf;
        return this;
    };

    ResultPromise.prototype.error = function(ef) {
        //覆盖默认的错误处理函数
        this.ef = function(data) {
            logger.error(data.data);
            ef(data);
        };
        return this;
    };
    ResultPromise.prototype.complete = function(cf) {
        this.cf = cf;
        return this;
    }
    ResultPromise.prototype.businessError = function(becode, callback) {
        var args = [].slice.apply(arguments);
        args.forEach(function(arg) {
            if (typeof arg === 'number' || typeof arg === 'string') {
                beStack[arg] = args[args.length - 1];
            }
        });
        return this;
    }
}

module.exports = {
    get : function(url, data = {}, config = {}){
        //console.log(fetch);
        //const fetch  = require("node-fetch");
        //url = env.INTERFACE_URL + url;
        //let query = "";
        //for(let i in data){
        //    if(query){
        //        query += "&";
        //    };
        //    query = query + i + "=" + data[i];
        //}
        //url += query;
        let rp = new ResultPromise();
        //fetch.get(url).then(body=>{
        //    console.log(body);
        //    rp.sf(body);
        //});
        setTimeout(function(){
            rp.sf({name : data.name});
        },100)
        return rp;
    }
}