/**
 * Created by zhoulijun on 16/8/1.
 */
"use strict";
const express = require('express');
const ReactDOMServer = require("react-dom/server.js");
const React = require("react");
const path = require("path");
const ejs = require("ejs");
const url = require("url");
const Constants = require("../env.js");
const domain = require("domain");
ejs.open = "{{";

const Demo = require("./components/demo.js");
const demoService = require("./services/demo_service");

ejs.close = "}}";
const app = express();
app.engine("ejs",ejs.renderFile);
var proxy = require('express-http-proxy');
app.use(express.static(path.join(__dirname, "../public")));
app.set('views', path.join(__dirname, Constants.views,'view'));
app.set('view engine', 'ejs');

app.use((req,res,next)=>{
    const reqDomain = domain.create();
    reqDomain.on("error",e=>{
        console.error("eeeeeeeeee")
        res.send("error");
    });
    reqDomain.add(req);
    reqDomain.add(res);
    reqDomain.run(next);
})

app.get('/demo/a', function (req, res) {
    demoService.getLoadName("zhoulijun").success((data)=>{
        const state = data;
        const html = ReactDOMServer.renderToString(<Demo {...state}/>);
        res.render("app", {html: html, state: JSON.stringify(state),title : "demo"});
    });
});

var apiProxy=proxy("localhost:3001",{
    forwardPath:function(req,res){
        console.log(url.parse(req.url).path);
        return url.parse(req.url).path;
    }
})

app.get("/data",apiProxy);

module.exports = {
    app: app,
    start: ()=> {
        app.listen(3000, '0.0.0.0', function (error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Listening at http://' + 'localhost' + ':3000');
        });
    }
}