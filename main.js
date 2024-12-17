const Battle = require("./battle");

const { input } = require("@inquirer/prompts");

const answer = async () => await input({ message: "Enter your name" });

answer();
