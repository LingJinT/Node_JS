const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end('3002' + req.url);
  })
  .listen(3002, () => {
    console.log("listen 3002");
  });
