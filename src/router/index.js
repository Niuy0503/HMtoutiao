import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// SPA
// 首屏加载速度很慢，用到路由懒加载---使用到路由界面再去请求
// 路由懒加载的chunk默认名字是模块的路径
// /** webpack魔法注释： webpackChunkName:'新名字' */
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
