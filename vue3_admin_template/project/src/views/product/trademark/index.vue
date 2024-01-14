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
      <el-table style="margin: 10px 0px" border>
        <el-table-column
          label="序号"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO"></el-table-column>
        <el-table-column label="品牌操作"></el-table-column>
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
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper, ->,sizes,total"
        :total="400"
      />
    </el-card>
  </div>
</template>
<script setup lang="ts" name="">
import { ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每一页显示多少条数据
let pageSize = ref<number>(3)
</script>
<style scoped></style>
