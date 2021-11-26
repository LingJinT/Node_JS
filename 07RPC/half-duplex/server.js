const net = require("net");

// 创建tcp服务器
const server = net.createServer((socket) => {
  socket.on("data", function (buffer) {
    // 从传来的buffer里读出一个int32
    const lessonid = buffer.readInt32BE();

    // 50毫秒后回写数据
    setTimeout(() => {
      socket.write(Buffer.from(data[lessonid]));
    }, 50);
  });
});

// 监听端口启动服务
server.listen(4000);

const data = {
  72: "复仇者联盟，天空之城",
  73: "高斯，陈省身，华罗庚",
  74: "陈景润，傅里叶，哥德巴赫",
  75: "阿基米德，欧拉，泊松",
  76: "霍金，祖冲之",
};
