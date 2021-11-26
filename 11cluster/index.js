const cluster = require("cluster");

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  require("./app");
}
