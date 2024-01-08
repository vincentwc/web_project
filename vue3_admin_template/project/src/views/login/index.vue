<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginFrom.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="defalut"
              @click="login"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
// 收集账号和密码数据
let loginFrom = reactive({
  username: 'admin',
  password: '111111',
})

// 点击按钮回调
const login = ()=>{
  // 点击按钮干什么
  // 通知仓库发登录请求
  // 请求成功->首页展示数据的地方
  // 请求失败->弹出登录失败信息
  
  
}
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  // 高度：视口高度
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
