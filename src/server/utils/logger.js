/**
 * @Desc: debug日志
 * @Author: 左左
 * @Date: 2016-06-07
 */
"use strict"
import constants from "../../env.js";

const buildArguments = function(arg){
		return [].slice.apply(arg).reduce(function(rs,a){
			console.log(a)
			if(typeof a === 'object'){
				rs += JSON.stringify(a);
			}else{
				rs += a;
			}
			return rs;
		},"");
	}

const instance = {
    log : function(){
		if(constants.debug){
			console.log(buildArguments(arguments));
		}
	},
	debug : function(){
		if(constants.debug){
			console.debug(buildArguments(arguments));
		}
	},
	error : function(){
		if(constants.debug) console.error(buildArguments(arguments));
	}
};