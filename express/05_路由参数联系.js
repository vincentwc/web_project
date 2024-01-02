const express = require("express");


const app = express();

app.get("/single/:id.html", (req, res) => {
  let { id } = req.params;

  res.end("hello express");
});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
