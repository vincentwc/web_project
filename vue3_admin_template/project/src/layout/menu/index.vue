<template>
  <!-- <p>{{ menuList }}</p> -->
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.children && !item.meta.hidden"
      :index="item.path"
      @click="goRoute"
    >
      <!-- <template #title> -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      <!-- </template> -->
    </el-menu-item>
    <!-- 有子路由，但是只有一个子路由 -->
    <el-menu-item
      v-if="
        item.children &&
        item.children.length == 1 &&
        !item.children[0].meta.hidden
      "
      :index="item.children[0].path"
      @click="goRoute"
    >
      <!-- <template #title> -->
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <span>{{ item.children[0].meta.title }}</span>
      <!-- </template> -->
    </el-menu-item>
    <!-- 有子路由，且个数大于一个 -->
    <el-sub-menu
      v-if="
        item.children &&
        item.children.length >= 2 &&
        !item.children[0].meta.hidden
      "
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts" name="">
import { useRouter } from 'vue-router'
// 获取父组件传递过来的全部路由数据
defineProps(['menuList'])
let $router = useRouter()
// 点击菜单的回调
const goRoute = (vc: any) => {
  // 路由跳转
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  // 递归组件需要名字
  name: 'Menu',
}
</script>
<style scoped></style>
