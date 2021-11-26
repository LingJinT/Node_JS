const http = require("http");
const fs = require("fs");
const game = require("./game.js");

const hostname = "127.0.0.1";
const port = 30000;

let playerWon = 0;
let playerLastAction = null;
let sameCount = 0;

const server = http.createServer((req, res) => {
  const parseUrl = new URL(req.url, `http://${hostname}:${port}`);

  if (parseUrl.pathname === "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (parseUrl.pathname === "/game") {
    const playerAction = parseUrl.searchParams.get("action");

    if (playerWon >= 3 || sameCount == 9) {
      res.writeHead(500);
      res.end("我再也不和你玩了！");
      return;
    }

    // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
    // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
    if (playerLastAction && playerAction == playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction;

    if (sameCount >= 3) {
      res.writeHead(400);
      res.end("你一直出同一种拳，你作弊！");
      sameCount = 9;
      return;
    }

    // 执行游戏逻辑
    const gameResult = game(playerAction);

    // 先返回头部
    res.writeHead(200);

    // 根据不同的游戏结果返回不同的说明
    if (gameResult == 0) {
      res.end("平局！");
    } else if (gameResult == 1) {
      res.end("你赢了！");
      // 玩家胜利次数统计+1
      playerWon++;
    } else {
      res.end("你输了！");
    }
  }

  if (parseUrl.pathname === "/") {
    res.writeHead(200);
    fs.createReadStream(__dirname + "/index.html").pipe(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
