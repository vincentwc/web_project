// 小仓库：关于layout组件相关配置的仓房
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 用于控制菜单折叠还是收起控制
    }
  },
})

export default useLayoutSettingStore
