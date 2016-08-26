/**
 * Created by zhoulijun on 16/8/24.
 */
"use strict"

var co = require('co');
var views = require('co-views');

var render = views(__dirname, {
    ext : "ejs",
    locals : {
        close : '}}',
        open : '{{'
    }
});

var tobi = {
    name: 'tobi',
    species: 'ferret'
};

var loki = {
    name: 'loki',
    species: 'ferret'
};

var luna = {
    name: 'luna',
    species: 'cat'
};

co(function *(){
    //var a = render('user', { user: tobi });
    //var b = render('user.jade', { user: loki });
    var c = render('user.ejs', { user: luna });
    var html = yield [c];
    html = html.join('');
    console.log(html);
});