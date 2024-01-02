const e = require("express");
const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  res.send("前台首页");
});

// 申明中间件
let checkCodeMiddleware = (req, res, next) => {
  if (req.query.code === "521") {
    next();
  } else {
    res.send("暗号错误");
  }
};

app.get("/admin", checkCodeMiddleware, (req, res) => {
  res.send("后台页面");
});

app.get("/setting", checkCodeMiddleware, (req, res) => {
  res.send("设置页面");
});

app.all("*", (req, res) => {
  res.send("<h1>404 not find</h1>");
});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
