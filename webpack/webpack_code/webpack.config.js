const path = require("path");

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径
    // __dirname代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),
    // 文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader加载器
    ],
  },
  // 插件
  plugins: [
    // plugin 插件
  ],
  // 模式
  mode: "development",
};
