const exec = require("child_process").exec;
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

modules.forEach(function(module) {
    var cmd = `
    cd .;    
    git clone ssh://git@stash.b2w/bcpricing/prc-frontend-${module}.git
    `;
    exec(cmd, function(error, stdout, stderr) {
    });
});
