
let fs = require('fs');
let path = require('path');


function treeFn(dirPath) {
    // console.log("Tree commnad executed with the path", dirPath ? dirPath : process.cwd());

    dirPath = (!dirPath) ? process.cwd() : dirPath;


    let dirName = path.basename(dirPath);

    console.log("📁", dirName);

    let content = fs.readdirSync(dirPath);

    for (let i = 0; i < content.length; ++i) {

        let contentName = content[i];
        let childPath = path.join(dirPath, "" + content[i]);

        if (isDirectory(childPath)) {
            console.log("\t>", contentName);
        } else {
            console.log("\t", contentName);
        }

    }
}

function isDirectory(dirpath) {
    return fs.lstatSync(dirpath).isDirectory();
}

module.exports = {
    treeFn: treeFn
}