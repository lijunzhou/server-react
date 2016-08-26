/**
 * Created by zhoulijun on 16/8/23.
 */
"use strict"

const express = require("express");

const app = express();

app.get('/data', function (req, res) {
    res.send({a : 123});
});

app.listen(3001, '0.0.0.0', function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Listening at http://' + 'localhost' + ':3001');
});
