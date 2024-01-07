import { createApp } from 'vue'
//  引入element-plus插件与样式
import ElementPlus from 'element-plus'
// @ts-ignore ts忽略类型检测(打包会报错)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from '@/App.vue'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

import 'virtual:svg-icons-register'

// 注册全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('svg-icon', SvgIcon)

import globalComponent from '@/components'
// 安装自定义插件
app.use(globalComponent)

// 挂载
app.mount('#app')

// 获取.env.development文件VITE_开头的属性
// console.log(import.meta.env);
