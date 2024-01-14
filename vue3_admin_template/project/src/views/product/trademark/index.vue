<template>
  <div class="">
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="">
        添加品牌
      </el-button>
      <!-- 表格组件，用于展示品牌已有的数据 -->
      <!-- 
        table
        --- border:设置表格纵向是否有边框
        table-column
        ---label:某一个咧列的标题
        ---width:设置这列宽度
        ---align:设置这一列的对齐方式
       -->
      <el-table style="margin: 10px 0px" border :data="tradenarkArr">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <!-- tabele-column:默认展示数据用div -->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl">
          <template #="{ row }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button type="warning" icon="Edit" size="small" />
            <el-button type="danger" icon="Delete" size="small" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器组件 -->
      <!-- 
        pagination
          v-model:current-page 设置分页器当前页码
          v-model:page-size 设置每页展示数据的条数
          page-sizes 用于设置下拉菜单的数据
          background 设置分页器按钮的背景颜色
          layout 可以设置分页器6个子组件布局调整
       -->
      <el-pagination
        @current-change="getHasTrademark"
        @size-change="sizeChange"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper, ->,sizes,total"
        :total="total"
      />
    </el-card>
  </div>
</template>
<script setup lang="ts" name="">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
// 当前页码
let pageNo = ref<number>(1)
// 每一页显示多少条数据
let limit = ref<number>(3)
// 存储已有品牌的数据的总数
let total = ref<number>(0)
// 存储已有品牌的数组
let tradenarkArr = ref<Records>([])
// 获取已有品牌的接口封装成一个函数：在任何情况下调用次函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    tradenarkArr.value = result.data.records
  }
}
// 组件挂在完毕钩子--发送一次请求，获取第一页，一页三个已有的品牌数据
onMounted(() => {
  getHasTrademark()
})

// //分页器当前页码发生变化时出发
// const changePageNo = () => {
//   // 当前页码发生变化，再次调用获取当前页的数据
//   getHasTrademark()
// }

// 当下拉菜单发生变化的时候【当前页数据改变】
// const sizeChange = () => {
//   // 当前页码改变时，页码置为一
//   pageNo.value = 1
//   getHasTrademark()
// }
</script>
getHasTrademark
<style scoped></style>
