// 对外暴漏配置路由
export const constantRoute = [
  {
    // 登陆
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由,
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 代表路由的标题在菜单中是否隐藏  true-隐藏  false-不隐藏
      icon: 'Promotion', // 菜单文字左侧图标，支持element-plus全部图标
    },
  },
  {
    // 登陆成功以后，展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 命名路由
    meta: {
      title: 'layout',
      hidden: false,
      icon: 'Avatar',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      // {
      //   path: '/ceshi',
      //   component: () => import('@/views/home/index.vue'),
      //   meta: {
      //     title: '测试',
      //     hidden: false,
      //     icon: 'Histogram',
      //   },
      // },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  // 任意路由:上述没有匹配到，则redirect[重定向]到404
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
    },
  },
]
