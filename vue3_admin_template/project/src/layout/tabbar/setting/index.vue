<template>
  <el-button
    size="small"
    icon="Refresh"
    @click="updateRefresh"
    circle
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    @click="fullScreen"
    circle
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts" name="">
// 获取layout小仓库
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
// 点击刷新按钮
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏按钮点击回调
const fullScreen = () => {
  //dom对象的一个属性,可以用来判断当前是不是全屏的模式[全屏-true；不是全屏-false]
  let full = document.fullscreenElement
  // 切换为全屏的模式
  if (!full) {
    // 利用文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 变为不是全屏模式
    document.exitFullscreen()
  }
}

// 退出登录点击回调
const logout = () => {
  // 第一件事：向服务器发请求[退出登录接口]
  // 第二件事：仓库中关于用户的相关数据清空[token|username|avator]
  userStore.userLogout()
  // 第三件事：跳转到登录页面,并且把当前的路由信息当作参数传递，当前用户再次登陆的时候，直接跳转到退出前的页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped></style>
