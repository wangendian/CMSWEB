import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'hello',
    component: () => import('../layout'),
    redirect: '/hello',
    children: [
      {
        path: 'hello',
        name: 'hello',
        component: () => import('@/views/hello/index.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('../layout'),
    redirect: '/system/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index.vue')
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('@/views/permissions/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
