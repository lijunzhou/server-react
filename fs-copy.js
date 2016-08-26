/**
 * Created by zhoulijun on 16/3/25.
 */
"use strict"
var fs = require('fs');
var path = require('path');

const copyFile = function (sourceFile, targetPath) {
    var readStream = fs.createReadStream(sourceFile);
    var writeStream = fs.createWriteStream(targetPath);
    readStream.pipe(writeStream);
    console.log("copy " + sourceFile + " to " + targetPath + "成功");
}

module.exports.copy = function (source, target) {
    var sourceFile = path.join(__dirname, source);
    var targetPath = path.join(__dirname, target);
    fs.stat(sourceFile, function (err, stats) {
        if (stats.isFile()) {
            copyFile(sourceFile, targetPath);
        } else {
            if (!fs.existsSync(targetPath)) {
                fs.mkdir(targetPath);
            }
            fs.readdir(sourceFile, function (err, files) {
                files.forEach(f=> {
                    copyFile(path.join(sourceFile, f), path.join(targetPath, f));
                })
            })
        }
    })

}
