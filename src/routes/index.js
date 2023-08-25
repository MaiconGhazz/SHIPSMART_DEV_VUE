import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Login.vue') },
  { path: '/home', component: () => import('../views/Home.vue') },
  { path: '/clients', component: () => import('../views/Clients/Clients.vue') },
  { path: '/clients/update/:id', component: () => import('../views/Clients/Update.vue') },
  { path: '/products', component: () => import('../views/Products/Products.vue') },
  { path: '/products/update/:id', component: () => import('../views/Products/Update.vue') },
  { path: '/address/:id', component: () => import('../views/AddressClients/AddressClients.vue') },
  { path: '/address/update/:id', component: () => import('../views/AddressClients/Update.vue') },
  { path: '/prices/:id', component: () => import('../views/PricesProducts/PricesProducts.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;