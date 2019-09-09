const { readFileSync, writeFileSync, existsSync } = require("fs");
const { join } = require("path");
const { template, toLower } = require("lodash");
const { mkdirpSync } = require("fs-extra");

const templateSettings = {
    interpolate: /{{([\s\S]+?)}}/g
};

function renderTemplate(name, params) {
    const path = join(__dirname, "templates", "javascript", `${name}.template`);
    return template(readFileSync(path).toString(), templateSettings)(params);
}

function writeFile(path, contents, force) {
    if (existsSync(path)) {
        if (!force) {
            console.error(`File already exists, skipping: ${path}`);
            return;
        }
    }

    console.log(path)
    writeFileSync(path, contents);
}

function create({ name, path, force }) {
    const params = {
        AppName: name,
        AppNameLowercase: toLower(name),
    };


    const src = join(path, "src");
    const contract = join(src, "contract", params.AppNameLowercase);
    const test = join(path, "test");

    mkdirpSync(src);
    mkdirpSync(contract);
    mkdirpSync(test);

    writeFile(join(path, ".gitignore"), renderTemplate(".gitignore", {}), force);
    writeFile(join(path, "package.json"), renderTemplate("package.json", params), force);

    writeFile(join(src, `deploy_${params.AppNameLowercase}.js`), renderTemplate("deploy.js", params), force);
    writeFile(join(src, `${params.AppNameLowercase}.js`), renderTemplate("interface.js", params), force);
    writeFile(join(contract, "contract.go"), readFileSync(join(__dirname, "templates", "contract", "contract.go")), force);

    writeFile(join(test, `${params.AppNameLowercase}_test.js`), renderTemplate("test.js", params), force);
}

module.exports = {
    create
}