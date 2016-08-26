/**
 * Created by zhoulijun on 2015/12/29.
 */
"use strict"
import reqwest from "reqwest";
import constants from "../../env.js";
import logger from "./logger.js";
import {isClient,isServer} from "./env_tools.js";


const ResultPromise = function() {
	var beStack = {};

	ResultPromise.prototype.sf = function(data) {
		//定义默认成功处理函数
		alert("操作成功")
	};
	ResultPromise.prototype.ef = function(data) {
		console.log(data);
		alert(data.errorMsg);
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

const request = function(url, data, config, type) {
	if (typeof url === "undefined") {
		throw new Error("url 不能为空");
	}
	isClient(()=>{
		url = "/__data__/" + url;
	},()=>{
		url = constants.INTERFACE_URL + url;
	})
	data = data || {};
	if (!(typeof data === "object" || typeof data === "string")) {
		throw new Error("data 参数只能是 json 或者 string");
	}
	if (typeof config === "boolean") {
		config = {
			loading: config
		};
	} else {
		config = config || {};
	}
	config.timeout = config.timeout || 10000,
		config.loading = config.loading === undefined ? false : config.loading,
		config.headers = config.headers || {};

//	type = type || "GET";
//	data = type !== 'GET' ? JSON.stringify(data) : data;
	let rp = new ResultPromise();
	if (!reqwest) {
		throw new Error("页面需要引入reqwest类库");
	}
	//put加载动画
	config.loading && loading.put({
		loadingParent:config.loadingParent,
		loadingIconStyle:config.loadingIconStyle
	});
	let p = reqwest({
		method: type,
		url: url,
		data: data,
		type: 'json',
//		contentType: 'application/json',
		headers: config.headers,
		timeout: config.timeout,
	});
	p.then(function(res) {
		if (res.msgcode != '100') {
			switch (res.msgcode) {
				case "102":
					{
						//用户未登录,自动调用微信授权获取openid,生成登录token
						let page = window.location.href;
						request("wechat/oauthurl",{
							page:page,
							type:"base"
						}).success(function(url){
							logger.debug(url);
							window.location.href = url;
						});
						
						break;
					}
				case "900":
					{
						rp.be({
							code: res.msgcode,
							errorMsg: res.msg,
							data: Object.assign({
								_url: url,
								_param: data
							}, res)
						});
						break;
					}
				default:
					{
						rp.ef({
							code: res.msgcode,
							errorMsg: res.msg,
							data: Object.assign({
								_url: url,
								_param: data
							}, res)
						});
					}
			}

		} else {
			rp.sf(res.msg);
		}
	}, function(res) {

		rp.ef({
			code: -1,
			errorMsg: "调用服务器接口发生错误",
			data: Object.assign({
				_url: url,
				_param: data
			}, res)
		});
	}).always(function() {
		//pop加载动画
		config.loading && loading.pop({
			loadingParent:config.loadingParent
		});
		rp.cf();
	});
	return rp;
};

/**
 * 获取数据接口
 * @param url 调用的接口地址 不带域
 * @param data 接口参数
 * @param config 预留配置项
 */
module.exports = {
	get: function(url, data, config) {
		return request(url, data, config);
	},
	post: function(url, data, config) {
		return request(url, data, config, "POST");
	},
	delete: function(url, data, config) {
		return request(url, data, config, "DELETE");
	}
}

