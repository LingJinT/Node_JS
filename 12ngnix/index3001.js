const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end('3001' + req.url);
  })
  .listen(3001, () => {
    console.log("listen 3001");
  });
