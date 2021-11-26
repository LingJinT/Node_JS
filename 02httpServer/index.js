const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 30000;

const server = http.createServer((req, res) => {
  const parseUrl = new URL(req.url, `http://${hostname}:${port}`);

  if (parseUrl.pathname === "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (parseUrl.pathname === "/hello") {
    res.writeHead(200);
    fs.createReadStream(__dirname + "/index.html").pipe(res);
    return;
  }

  res.writeHead(200);
  res.end(parseUrl.pathname);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
