/**
 * Created by zhoulijun on 16/8/15.
 */
"use strict";
const fs = require("fs");
const fsCopy = require("./fs-copy.js");
const env = process.argv[2]||"dev" ;
if(!fs.existsSync("dev"))fs.mkdirSync("dev");
if(!fs.existsSync("dev/client"))fs.mkdirSync("dev/client");
if(!fs.existsSync("dev/server"))fs.mkdirSync("dev/server");
fsCopy.copy(`config/env.${env}.js`,"dev/env.js");