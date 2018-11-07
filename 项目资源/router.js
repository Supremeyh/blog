import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

// 登录
const LogIn = () => import('../views/login/LogIn.vue')
const RetrievePwd = () => import('../views/login/RetrievePwd.vue')
const ResetPwd = () => import('../views/login/ResetPwd.vue')
// NotFound
const NotFound = () => import('../views/notfound/NotFound.vue')

// 不重定向白名单
const whiteList = ['/login', '/register']

const constantRouterMap = [
  // 登录
  { path: '/', name: 'toLogin', component: LogIn, redierct: '/login', hidden: true },
  { path: '/login', name: 'login', component: LogIn, hidden: true },
  { path: '/retrievepwd', name: 'RetrievePwd', component: RetrievePwd, hidden: true },
  { path: '/resetpwd', name: 'resetpwd', component: ResetPwd, hidden: true },
  // NotFound
  { path: '/notfound', name: 'NotFound', component: NotFound, hidden: true }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (to.matched.some(record => record.meta.requireAuth) && (store.state.user.token !== 'true')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
})

export default router
