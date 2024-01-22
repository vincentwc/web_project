<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <!--  -->
    <el-card style="margin: 10px 0px">
      <!-- 
        v-if v-show都可以显示与隐藏        
       -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <!-- 展示已有的spu数据 -->
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="cunter"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <!-- row:即为已有的spu对象 -->
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->, sizes, total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <!-- 添加spu|修改spu子组件 -->
      <SpuForm v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <!-- 添加sku子组件 -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="">
import { ref, watch } from 'vue'
// 引入分类的仓库
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let categoryStore = useCategoryStore()
// 场景数据
const scene = ref<number>(0) // 场景0-显示已有的spu，1-添加|修改已有的spu，2-添加sku
// 分页器默认页码
let pageNo = ref<number>(1)
// 每一页展示几条数据
let pageSize = ref<number>(3)
// 存储已有的spu数据
let records = ref<Records>([])
// 存储已有的SOU总个数
let total = ref<number>(0)
// 监听三级分类id的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 务必保证有三级分类id
    if (!categoryStore.c3Id) {
      return
    }
    getHasSpu()
  },
)

// 此方法执行，可获取某一个三级分类下全部已有的spu
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

// 分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  getHasSpu()
}

// 添加新的spu按钮的回调
const addSpu = () => {
  // 切换为场景1,：添加与修改已有spu结构->spuForm
  scene.value = 1
}

// 修改已有的spu按钮的回调
const updateSpu = () => {
  // 切换为场景1,：修改已有spu结构->spuForm
  scene.value = 1
}

// 子组件spuForm绑定的自定义事件：目前是让子组件通知父组件切换场景0
const changeScene = (num: number) => {
  // 子组件spuForm点击取消变为场景0，展示已有的spu
  scene.value = num
}
</script>
<style scoped></style>
