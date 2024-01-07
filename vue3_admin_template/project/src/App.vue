<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>
<script setup lang="ts" name="">
import request from '@/utils/request'
import { onMounted } from 'vue'

// 当组件挂载完毕，发送一个请求
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111',
    },
  }).then((res) => {
    console.log(res)
  })
})
</script>
<style scoped lang="scss">
div {
  h1 {
    color: red;
  }
}
</style>
