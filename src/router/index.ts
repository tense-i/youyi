import { createRouter, createWebHistory } from 'vue-router'

// 静态路由
const routes = [
  {
    path: '/',
    // 重定向到home
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/logout',
    component: () => import('../views/login/logout.vue')
  },
  {
    path: '/register',
    component: () => import('../views/login/register.vue')
  },

  {
    path: '/test',
    component: () => import('../views/TestPage/index.vue')
  }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
