<template>
  <div class="">
    <h1>我是一级路由展示登陆成功以后的数据{{ userStore.username }}</h1>
  </div>
</template>
<script setup lang="ts" name="">
// 引入组合式api函数之生命函数
import { onMounted } from 'vue'
// 获取用户仓库
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()

onMounted(()=>{
  userStore.userInfo()
})
</script>
<style scoped></style>
