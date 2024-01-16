// 小仓库：关于layout组件相关配置的仓房
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 用于控制菜单折叠还是收起控制
      refresh: false, // 用于控制页面右上角刷新效果
    }
  },
})

export default useLayoutSettingStore
