import store from '@/store'
import router from './index'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
