const express = require("express");

const app = express();

app.get("/response", (req, res) => {
  // 原生响应
  // res.statusCode = 404;
  // res.statusMessage = "vincent";
  // res.setHeader("xxx", "yyy");
  // res.write("hello express");
  // res.end("response");

  // express响应
  res.status(500);
  res.set("aaa", "bbb");
  res.send("你好  express");
});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
