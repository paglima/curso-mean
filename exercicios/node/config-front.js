var process = require('process');
const exec = require("child_process").execSync;
var fs = require('fs');

var dirPrefix = 'prc-frontend-';
var modules = [
    "auth",
    "batch",
    "main",
    "core",
    "theme",
    "dynamic",
    "pricing-panel",
    "promotion",
    "price-lock",
    "user",
    "file",
    "request",
    "massive-pricing",
    "scheduling",
    "margin",
    "history"];

// Configs
var root = '/home/paglima/Projects/pricing-front';
var configsDeployPath = "/home/paglima/Projects/b2w/front/deploy/configs/";
var modulesDeployPath = "/home/paglima/Projects/b2w/front/deploy/modules/";

var gulpconfigdev = {
    configsDeployPath: configsDeployPath,
    modulesDeployPath: modulesDeployPath
};

var gulpconfigdevMain = {
    serverPort: 8000,
    serverHost: "localhost",
    serverOpen: false,
    configsPath: configsDeployPath,
    configsServerPort: 8001,
    modulesPath: modulesDeployPath,
    modulesServerPort: 8002
};
// Configs

process.chdir(root);

var firstScript = `
mkdir -p deploy/configs;
mkdir deploy/modules; 
mkdir -p shared/node_modules;
cd shared/node_modules;
ln -s ../../prc-frontend-gulptasks/ gulp-prc-tasks;
ln -s ../../prc-frontend-gulptasks/node_modules/gulp gulp;
`;

runScript(firstScript);

process.chdir(root);

modules.forEach(function(module) {
    var currentDir = dirPrefix + module + '/';
    process.chdir(currentDir);
    console.log(process.cwd());
    createGulpConfigDev(module);

    var secondScript = `
    bower install;
    ln -s ../shared/node_modules;
    cd src/config;
    cp homolog-pricing.json development.json;`;

    runScript(secondScript);

    process.chdir(root);
});

function runScript(script) {
    exec(script, function(error, stdout, stderr) {
    });
}

function createGulpConfigDev(module) {
    var gulpFileConfigDevFinal;
    var tabLength = 4;

    if(module === 'main') {

        gulpFileConfigDevFinal = JSON.stringify(gulpconfigdevMain, null, tabLength);

    } else {
        gulpFileConfigDevFinal = JSON.stringify(gulpconfigdev, null, tabLength);
    }

    fs.writeFile(".gulpconfigdev", gulpFileConfigDevFinal, function(err) {
    });
}

