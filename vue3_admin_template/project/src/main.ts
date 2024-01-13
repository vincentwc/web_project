import { createApp } from 'vue'
//  引入element-plus插件与样式
import ElementPlus from 'element-plus'
// @ts-ignore ts忽略类型检测(打包会报错)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
// 引入模板全局样式
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
// 引入路由
import router from './router'
import pinia from './store'

// 引入路由鉴权文件
import './permission'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

// 注册全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('svg-icon', SvgIcon)

// 安装自定义插件
app.use(globalComponent)

// 测试代码，测试假接口能否使用
// import axios from 'axios'
// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '111111',
//   },
// })

// 注册模板路由
app.use(router)

// 安装仓库
app.use(pinia)

// 挂载
app.mount('#app')

// 获取.env.development文件VITE_开头的属性
// console.log(import.meta.env);
