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
      icon: 'Avatar',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
      // {
      //   path: '/ceshi',
      //   component: () => import('@/views/home/index.vue'),
      //   meta: {
      //     title: '测试',
      //     icon: 'Histogram',
      //   },
      // },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'Acl',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '权限管理',
          icon: 'Monitor',
        },
      },
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
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
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
