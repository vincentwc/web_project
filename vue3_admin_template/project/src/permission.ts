// 路由鉴权
import router from './router'
// 引入进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import pinia from './store'
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
import setting from './setting'
let userStore = useUserStore(pinia)

// 全局守卫：项目中任意路由的切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  // 访问某一个路由之前守卫
  // to:将要访问哪一个路由
  // from:从哪一个路由跳转
  // next:路由的放行函数
  nprogress.start()
  // 获取token，去判断用户是登录还是未登录
  let token = userStore.token
  // 获取用户的名字
  let username = userStore.username
  if (token) {
    // 用户登录
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        // 有用户信息，放行
        next()
      } else {
        // 没有用户信息，在守卫这里发请求获取到了用户信息在放行
        try {
          // 获取用户信息
          await userStore.userInfo()
          // 放行
          next()
        } catch (error) {
          // token过期，获取不到用户信息
          // 用户手动修改本地存储的token
          // 退出登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done()
})

// 第一个问题：任意路由切换实现进度条业务 ---nprogress
// 第二个问题：路由鉴权（路由组件访问权限设置）
// 全部的路由组件：登录｜404｜任意路由｜首页｜数据大屏｜权限管理（三个子路由）｜商品管理（四个子路由）

// 用户未登录：可以访问login，其余六个路由不能访问（指向login）
// 用户登录成功：不可以访问login[指向首页]，其余路由可以访问
