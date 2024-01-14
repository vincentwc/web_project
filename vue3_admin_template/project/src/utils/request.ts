// 进行axios二次封装，使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '../store/modules/user'

// 1. 利用axios对象的create方法，创建axios实例（其他的配置：基础路径，超时时间）
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带 /api
  timeout: 5000, // 请求超时时间
})

// 2. request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  let userStore = useUserStore()
  // console.log(userStore);
  
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

// 3. 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化数据
    return response.data
  },
  (error) => {
    // 失败回调,处理http网络错误
    // 定义一个变量，存储网络错误信息
    let message = ''
    // http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期，请重新登录'
        break
      case 403:
        message = '没有权限，请联系管理员'
        break
      case 404:
        message = '请求资源不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = '网络连接错误'
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

// 4. 对外暴露
export default request
