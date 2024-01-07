// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'

const allGlobalComponent = {
  SvgIcon,
}
// console.log(Object.keys(allGlobalComponent))

// 对外暴露
export default {
  install(app) {
    // 注册项目的全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册全局组件
      app.component(key, allGlobalComponent[key])
    })
  },
}
