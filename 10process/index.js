const cp = require("child_process");

const process = cp.fork(__dirname + "/child.js");

process.send("from master hhh");

process.on("message", (str) => {
  console.log(str);
});
