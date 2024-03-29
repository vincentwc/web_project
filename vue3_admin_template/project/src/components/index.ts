// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: any = {
  SvgIcon,
  Category,
}

// 对外暴露
export default {
  install(app: any) {
    // 注册项目的全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
