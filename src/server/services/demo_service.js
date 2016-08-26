/**
 * Created by zhoulijun on 16/8/23.
 */
"use strict";
import http from "../utils/http_loader.js";

module.exports = {
    getLoadName : function(name){
        return new Promise(resolve=>{
            (function* gen(){
                console.log(http)
                http.get("mockjsdata/18/s/supplierBean",{
                    name,
                }).success(data=>{
                    resolve({
                        name : data.name
                    });
                });
            })().next();
        })
    }
}