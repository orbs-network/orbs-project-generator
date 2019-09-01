const yargs = require("yargs");
const { create } = require("./src/create");

yargs.command("create <name> <path>", "generates new project", () => {}, (argv) => {
    create(argv);
}).help().argv