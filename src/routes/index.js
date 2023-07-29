import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Login.vue') },
  { path: '/home', component: () => import('../views/Home.vue') },
  { path: '/add', component: () => import('../views/Add.vue') },
  { path: '/update/:id', component: () => import('../views/Update.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;