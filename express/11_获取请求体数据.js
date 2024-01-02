const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// create application/json parser 解析json格式的请求体中间件
// var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser 解析queryString格式请求体的中间件
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/login", (req, res) => {
  // res.send('表单页面')
  res.sendFile(__dirname + "/11_form.html");
});

app.post("/login", urlencodedParser, (req, res) => {
  console.log(req.body);
  res.send("获取用户数据");
});

app.listen(3000, () => {
  console.log("server is running...");
});
