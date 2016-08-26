var express = require('express');
var webpack =  require('webpack');
var config  = require('./webpack.dev.config');
var path = require('path');

var os = require('os');
var interfaces = os.networkInterfaces();
var IPv4 = '172.18.1.39';
for (var key in interfaces) {
    var alias = 0;
    interfaces[key].forEach(function(details){
        if (details.family == 'IPv4' && key == 'en0'  ) {
            IPv4 = details.address;
        }
    });
}
console.log(IPv4)

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
    if(path.extname(req.url)){ //如果请求的url文件有后缀名则直接返回该文件
        res.sendFile(path.join(__dirname,"dev/" + req.url));
    }else{//如果没有后缀名统一用app.html处理,走路由
        res.sendFile(path.join(__dirname, 'dev/app.html'));
    }
});

app.listen(3000, IPv4, function(error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log('Listening at http://'+IPv4+':3000');
});
