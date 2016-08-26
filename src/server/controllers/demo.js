/**
 * Created by zhoulijun on 16/8/25.
 */
"use strict";
import demoService from "../services/demo_service.js";
const ReactDOMServer = require("react-dom/server.js");
const React = require("react");
const Demo = require("../components/demo.js");

module.exports = {
    path : "/demo/a",
    controller : (app,render)=>{
        return function* (next) {
            let html;
            let state;
            const g = (function* (app,render){
                state = yield demoService.getLoadName("后端").then(data=>{
                    g.next(data);
                });
                html = ReactDOMServer.renderToString(<Demo {...state}/>);
            }.bind(this))();
            yield g.next();
            this.body = yield render("app.ejs", {html: html, state: JSON.stringify(state),title : "demo"});
        }
    }
}