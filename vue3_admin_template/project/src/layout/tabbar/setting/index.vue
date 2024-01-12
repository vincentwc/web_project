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
    src="../../../../public/logo.png"
    style="width: 24px; height: 24px; margin: 0px 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts" name="">
// 获取layout小仓库
import useLayoutSettingStore from '@/store/modules/setting'

let layoutSettingStore = useLayoutSettingStore()
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
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped></style>
