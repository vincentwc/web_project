const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  res.end("hello express");
});

app.get("/", (req, res) => {
  res.end("home");
});

app.post("/login", (req, res) => {
  res.end("login");
});

// 匹配所有类型方法
app.all("/test", (req, res) => {
  res.send('test')
});

app.all("*", (req, res) => {
  res.send('****')
});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
