const fs = require("fs");
const protobuf = require("protocol-buffers");

// 根据协议，编译出一个js逻辑对象，里面包含encode和decode函数
const schemas = protobuf(fs.readFileSync(`${__dirname}/test.proto`));

const buffer = schemas.Course.encode({
  id: 4,
  name: "hh",
  lesson: [],
});
console.log(buffer);
console.log(schemas.Course.decode(buffer));
