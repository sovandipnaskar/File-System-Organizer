let helpFnObject = require("./commands/help");
let treeFnObject = require("./commands/tree");
let organizeFnObject = require("./commands/organize");

// insert the command you want to execute
let ip = process.argv.slice(2);

let command = ip[0];
let dirPath = ip[1];


if (!dirPath)
    dirPath = process.cwd();


switch (command) {

    case "help":
        helpFnObject.helpFn();
        break;
    case "tree":
        treeFnObject.treeFn(dirPath);
        break;
    case "organize":
        organizeFnObject.organizeFn(dirPath)
        break;
    default:
        console.log("Wrong command, Type help to see the all the listed commands");
}