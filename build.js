/**
 * Created by zhoulijun on 16/8/12.
 */
"use strict";
const fsCopy = require("./fs-copy");
fsCopy.copy("config/env.pro.js","dist/env.js");
fsCopy.copy("start.js","dist/start.js");