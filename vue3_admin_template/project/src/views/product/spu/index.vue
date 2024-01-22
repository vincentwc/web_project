<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <!--  -->
    <el-card style="margin: 10px 0px">
      <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
      <el-table style="margin: 10px 0px" border>
        <el-table-column
          label="序号"
          type="index"
          align="cunter"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->, sizes, total"
        :total="400"
      />
    </el-card>
  </div>
</template>
<script setup lang="ts" name="">
import { ref } from 'vue'
// 场景数据
const scene = ref<number>(0)
// 分页器默认页码
let pageNo = ref<number>(1)
// 每一页展示几条数据
let pageSize = ref<number>(3)
</script>
<style scoped></style>
