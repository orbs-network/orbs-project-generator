const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { template, toLower } = require("lodash");
const { mkdirpSync, rmdirSync } = require("fs-extra");

const templateSettings = {
    interpolate: /{{([\s\S]+?)}}/g
};

function renderTemplate(name, params) {
    const path = join(__dirname, "templates", "javascript", `${name}.template`);
    return template(readFileSync(path).toString(), templateSettings)(params);
}

function writeFile(path, contents) {
    console.log(path)
    writeFileSync(path, contents);
}

function create({ name, path }) {
    const params = {
        AppName: name,
        AppNameLowercase: toLower(name),
    };


    const src = join(path, "src");
    const test = join(path, "test");

    mkdirpSync(src);
    mkdirpSync(test);

    writeFile(join(path, ".gitignore"), renderTemplate(".gitignore", {}));
    writeFile(join(path, "package.json"), renderTemplate("package.json", params));

    writeFile(join(src, "deploy.js"), renderTemplate("deploy.js", params));
    writeFile(join(src, `${params.AppNameLowercase}.js`), renderTemplate("interface.js", params));

    writeFile(join(test, `${params.AppNameLowercase}_test.js`), renderTemplate("test.js", params));
}

module.exports = {
    create
}