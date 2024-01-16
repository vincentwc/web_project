<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Category></Category>
    <el-card style="margin: 10px 0px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
      >
        添加平台属性
      </el-button>
      <el-table style="margin: 10px 0px" border :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="">
// 组合式api函数的watch
import { watch, ref } from 'vue'
// 引入获取已有属性与属性值接口
import { reqAttr } from '@/api/product/attr'
// 获取分类的仓库
import useCategoryStore from '@/store/modules/category'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
let categoryStore = useCategoryStore()
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
// 监听仓库三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 三级分类发生变化，清空上一次查询的属性与属性值
    attrArr.value = []
    // 要保证三级分类有才能发送请求
    if (!categoryStore.c3Id) {
      return
    }
    getAttr()
  },
)
//  获取已有的属性与属性值方法
const getAttr = async () => {
  // 获取分类的id
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
</script>
<style scoped></style>
