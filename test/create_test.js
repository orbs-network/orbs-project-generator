const { exec } = require("child_process");
const { join } = require("path");
const { removeSync } = require("fs-extra");
const { promisify } = require("util");
const assert = require("assert");

async function runProcess(command, cwd, checkStderr) {
    console.log(command)
    console.log();

    const generatorExecutionResult = await promisify(exec)(command, {
        cwd
    });

    console.log(generatorExecutionResult.stdout);
    console.log(generatorExecutionResult.stderr);

    if (checkStderr) {
        assert.equal(generatorExecutionResult.stderr, "");
    }
}

describe("create", () => {
    it("generates js project", async () => {
        const tmp = join(__dirname, "tmp");
        removeSync(tmp);

        await runProcess(`node index.js create Hello ${tmp}`, join(__dirname, ".."));
        await runProcess(`node index.js create Bye ${tmp}`, join(__dirname, ".."));

        await runProcess(`npm install`, tmp);
        await runProcess(`npm run gamma:start`, tmp);
        await runProcess(`npm run hello:local`, tmp);
        await runProcess(`npm test`, tmp);
        await runProcess(`npm run gamma:stop`, tmp);
    });
});