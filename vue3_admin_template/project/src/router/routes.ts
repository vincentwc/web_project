// 对外暴漏配置路由
export const constantRoute = [
  {
    // 登陆
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
  },
  {
    // 登陆成功以后，展示数据的路由
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout', // 命名路由
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由
  },
  // 任意路由:上述没有匹配到，则redirect[重定向]到404
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'Any',
  },
]
