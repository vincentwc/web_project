const express = require("express");

const app = express();

app.use((req, res, next) => {
  // 检测请求头中的referer是否为127.0.0.1
  let referer = req.get("referer");
  if (referer) {
    let url = new URL(referer);
    let hostname = url.hostname;
    if (hostname != "127.0.0.1") {
      res.status(404).send("<h1>404 not find</h1>");
      return;
    }
  }
  next();
});

app.use(express.static(__dirname + "/public"));

app.listen(3000, () => {
  console.log("服务已启动，端口3000正在监听中...");
});
