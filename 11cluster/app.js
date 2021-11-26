const http = require("http");
const fs = require("fs");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(fs.readFileSync(__dirname + "/index.htm", "utf-8"));
});

server.listen(8000, () => {
  console.log("listen 8000");
});
