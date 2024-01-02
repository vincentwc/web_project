const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  res.end("hello express");
});

app.listen(3000, () => {
  console.log('服务已经启动，端口3000，正在监听中...');
});
