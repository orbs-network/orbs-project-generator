#!/usr/bin/env node
const yargs = require("yargs");
const { create } = require("./src/create");

yargs.command("create <name> <path>", "generates new project", () => { }, (argv) => {
    create(argv);
}).option("force", {
    alias: "f",
    type: "boolean",
    description: "Overwrite output"
}).help().argv