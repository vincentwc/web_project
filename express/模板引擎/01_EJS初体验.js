// 1 安装EJS
// 2 导入ejs
const ejs = require("ejs");
const fs = require("fs");

let str1 = "hello";
let str2 = "vincent";

let str = `${str1} ${str2}`;

// 使用ejs渲染
let str3 = fs.readFileSync("./01_html.html").toString();

let weather = '今天天气不错~'

let result = ejs.render(str3, { str2: str2 ,weather});
console.log(result);
