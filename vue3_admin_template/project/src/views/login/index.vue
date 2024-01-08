<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginFrom"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
              :loading="loading"
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
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
// 引入用户相关小仓库
let useStore = useUserStore()
// 获取el-form组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
// 定义变量控制按钮加载效果
let loading = ref(false)
// 收集账号和密码数据
let loginFrom = reactive({
  username: 'admin',
  password: '111111',
})

// 点击按钮回调
const login = async () => {
  //保证全部的表单项校验通过再发请求
  await loginForms.value.validate()
  loading.value = true
  // 点击按钮干什么
  // 通知仓库发登录请求
  // 请求成功->首页展示数据的地方
  // 请求失败->弹出登录失败信息
  try {
    // 保证登陆成功
    await useStore.userLogin(loginFrom)
    // 编程式导航跳转到首页
    $router.push('/')
    // 登陆成功的提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
    // 登录成功，加载效果消失
    loading.value = false
  } catch (error) {
    // 登录失败，加载效果消失
    loading.value = false
    // 登陆失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

// 定义表单校验需要的配置对象
const rules = {
  // 规则对象属性
  // required-代表这个属性必须校验
  // min-文本长度最少多少位
  // max
  // message - 提示错误信息
  // trigger - 触发表单校验的时机 change->文本发生变化触发校验  blur->失去焦点触发校验
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { required: true, min: 6, message: '账号长度最少六位', trigger: 'change' },
    { required: true, max: 10, message: '账号长度最长十位', trigger: 'change' },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: '密码长度至少六位',
      trigger: 'change',
    },
  ],
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
