// 商品分类全局组件小仓库
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { defineStore } from 'pinia'
import type { CategoryResponseData } from '@/api/product/attr/type'
import { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类数据
      c1Arr: [],
      // 存储一级分类id
      c1Id: '',
      // 存储对应一级分类下的二级分类数据
      c2Arr: [],
      // 存储对应一级分类下的二级分类的分类id
      c2Id: '',
      // 存储对应二级分类下的三级分类数据
      c3Arr: [],
      // 存储对应二级分类下的三级分类的分类id
      c3Id: '',
    }
  },
  actions: {
    // 获取一级分类的方法
    async getC1() {
      // 发请求获取一级分类的数据
      const result: CategoryResponseData = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    // 获取二级分类的数据
    async getC2() {
      const result = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    // 获取三级分类的数据
    async getC3() {
      const result = await reqC3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
