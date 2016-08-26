/**
 * Created by zhoulijun on 16/8/23.
 */
"use strict"

module.exports = {
    isClient : (trueCallback,falseCallback)=>{
        try{
            if(window){
                trueCallback();
            }
        }catch(e){
            falseCallback && falseCallback();
        }
    },
    isServer : (trueCallback,falseCallback)=>{
        try{
            if(!window){
                trueCallback();
            }
        }catch(e){
            falseCallback();
        }
    }
}