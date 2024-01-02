const express = require("express");

const app = express();
const fs = require("fs");
const path = require("path");

// 申明中间件函数
function recordMiddleware(req, res, next) {
  // 1. 获取url，ip
  let { url, ip } = req;
  // 2. 保存
  fs.appendFileSync(
    path.resolve(__dirname, "./access.log"),
    `${url} ${ip}\r\n`
  );
  // 调用next
  next();
}

// 使用中间件函数
app.use(recordMiddleware);

app.get("/home", (req, res) => {
  res.send("前台首页");
});

app.get("/admin", (req, res) => {
  res.send("后台首页");
});

app.all("*", (req, res) => {
  res.send("<h1>404 not find</h1>");
});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
