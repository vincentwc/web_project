const express = require("express");
const homeRouter  = require('./routes/homeRouter')
const adminRouter  = require('./routes/adminRouter')

const app = express();

app.use(homeRouter)
app.use(adminRouter)


app.all("*", (req, res) => {
  res.send("<h1>404 not find</h1>");
});

app.listen(3000, () => {
  console.log("服务已经启动，端口3000，正在监听中...");
});
