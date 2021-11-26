// 模拟三轮面试

const interview = (round) => {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.8) {
      resolve("success");
    } else {
      const err = new Error();
      err.round = round;
      reject(err);
    }
  });
};

// (() => {
//   interview(1)
//     .then(() => interview(2))
//     .then(() => interview(3))
//     .then(() => console.log("good"))
//     .catch((err) => {
//       console.log(`cry at ${err.round}`);
//     });
// })();

(async () => {
  try {
    await interview(1);
    await interview(2);
    await interview(3);
    console.log("good");
  } catch (error) {
    console.log(`cry at ${error.round}`);
  }
})();
