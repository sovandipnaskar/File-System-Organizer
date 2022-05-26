let fs = require('fs');
let path = require('path');


let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    shellScript: ['sh', 'zsh', 'fish']
}

function getExtension(filePath) {

    let extension = path.extname(filePath);
    let extensionName = extension.slice(1); // because dot has to be removed from extension name

    let res = "others"
    for (let key in types) {

        let typeOfExtension = types[key];

        if (typeOfExtension.includes(extensionName)) {
            res = key;
            break;
        }
    }

    return res;
}

function organizeFn(dirPath) {
    console.log("Organize commnad executed with the path", dirPath ? dirPath : process.cwd());

    organizeHelper(dirPath);
}

function isFile(filePath) {

    return fs.lstatSync(filePath).isFile();
}

function copyToThatType(filePath, type, organizedDirPath) {
    // organize folder ke andar type wala folder create karna hai and content copy karna hai

    let destFolderPath = path.join(organizedDirPath, type);

    if (!fs.existsSync(destFolderPath))
        fs.mkdirSync(destFolderPath);

    let srcFilePath = filePath;
    let originalFileName = path.basename(srcFilePath);

    let destFilePath = path.join(destFolderPath, originalFileName);

    fs.copyFileSync(srcFilePath, destFilePath);


}


function organizeHelper(dirPath) {
    // create an organizee directory in dirPath
    let organizedDirPath = path.join(dirPath, "organized_dir");

    if (!fs.existsSync(organizedDirPath))
        fs.mkdirSync(organizedDirPath);

    // read content of this path
    let contents = fs.readdirSync(dirPath);

    // only get the files

    for (let i = 0; i < contents.length; ++i) {

        let filePath = path.join(dirPath, contents[i]);

        if (isFile(filePath)) {
            // check extname

            let type = getExtension(filePath);

            copyToThatType(filePath, type, organizedDirPath);
        }
    }

}

module.exports = {
    organizeFn : organizeFn
}
