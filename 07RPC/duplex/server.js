const net = require("net");

const server = net.createServer((socket) => {
  let oldBuffer = null;
  socket.on("data", function (buffer) {
    // 把上一次data事件使用残余的buffer接上来
    if (oldBuffer) {
      buffer = Buffer.concat([oldBuffer, buffer]);
    }

    let packageLength = 0;
    // 只要还存在可以解成完整包的包长
    while ((packageLength = checkComplete(buffer))) {
      const package = buffer.slice(0, packageLength);
      buffer = buffer.slice(packageLength);

      // 把这个包解成数据和seq
      const result = decode(package);

      // 计算得到要返回的结果，并write返回
      socket.write(encode(LESSON_DATA[result.data], result.seq));
    }

    // 把残余的buffer记下来
    oldBuffer = buffer;
  });
});

server.listen(4000);

/**
 * 二进制包编码函数
 * 在一段rpc调用里，服务端需要经常编码rpc调用时，业务数据的返回包
 */
function encode(data, seq) {
  // 正常情况下，这里应该是使用 protobuf 来encode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接把课程标题转buffer返回
  const body = Buffer.from(data);

  // 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
  // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
  const header = Buffer.alloc(6);
  header.writeInt16BE(seq);
  header.writeInt32BE(body.length, 2);

  const buffer = Buffer.concat([header, body]);

  return buffer;
}

/**
 * 二进制包解码函数
 * 在一段rpc调用里，服务端需要经常解码rpc调用时，业务数据的请求包
 */
function decode(buffer) {
  const header = buffer.slice(0, 6);
  const seq = header.readInt16BE();

  // 正常情况下，这里应该是使用 protobuf 来decode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接读一个Int32即可
  const body = buffer.slice(6).readInt32BE();

  // 这里把seq和数据返回出去
  return {
    seq,
    data: body,
  };
}

/**
 * 检查一段buffer是不是一个完整的数据包。
 * 具体逻辑是：判断header的bodyLength字段，看看这段buffer是不是长于header和body的总长
 * 如果是，则返回这个包长，意味着这个请求包是完整的。
 * 如果不是，则返回0，意味着包还没接收完
 * @param {} buffer
 */
function checkComplete(buffer) {
  if (buffer.length < 6) {
    return 0;
  }
  const bodyLength = buffer.readInt32BE(2);
  return 6 + bodyLength;
}

// 假数据
const LESSON_DATA = {
  72: "复仇者联盟，天空之城",
  73: "高斯，陈省身，华罗庚",
  74: "陈景润，傅里叶，哥德巴赫",
  75: "阿基米德，欧拉，泊松",
  76: "霍金，祖冲之",
};
