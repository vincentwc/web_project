const express = require("express");

const app = express();

app.get("/other", (req, res) => {
  // 跳转
  // res.redirect('http://baidu.com');
  // 下载
  // res.download(__dirname+'/package.json')

  // json
  // res.json({
  //   name: "vincent",
  //   slogon: "加油",
  // });

  // 响应文件
  res.sendFile(__dirname+'/02_form.html')

});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
