const koa = require("koa");
const fs = require("fs");
const mount = require("koa-mount");
const static = require("koa-static");

const app = new koa();

app.use(static(__dirname + "/source/"));

const buffer = fs.readFileSync(__dirname + "/source/index.htm", "utf-8");

app.use(
  mount("/", async (ctx) => {
    ctx.body = buffer
  })
);

app.listen(4000);
module.exports = app;
