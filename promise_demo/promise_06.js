const mongoose = require("mongoose");

new Promise((resolve, reject) => {
  mongoose.connect("mongodb://127.0.0.1:27017/project1");
  mongoose.connection.on("open", () => {
    resolve();
  });
  mongoose.connection.on("err", () => {
    reject();
  });
}).then(
  (value) => {
    const noteSchema = new mongo.Schema({
      title: String,
      content: String,
    });

    const nodeModel = mongoose.model("notes", noteSchema);

    nodeModel.find().then(
      (value) => {
        console.log(value);
      },
      (reason) => {
        console.log(reason);
      }
    );
  },
  (reason) => {
    console.log("数据库连接失败");
  }
);
