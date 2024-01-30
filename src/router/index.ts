// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      },
      {
        path: 'search-result',
        name: 'Search Result',
        component: () => import('@/views/SearchResult.vue')
      },
      {
        path: 'detail-view',
        name: 'Detail View',
        component: () => import('@/views/DetailView.vue')
      },
      {
        path: 'about-us',
        name: 'About Us',
        component: () => import('@/views/AboutUs.vue')
      },
      {
        path: 'login',
        name: 'Log In',
        component: () => import('@/views/LoginPage.vue')
      },
      {
        path: 'new-entry',
        name: 'New Entry',
        component: () => import('@/views/NewEntry.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app')!.scrollIntoView({ behavior: 'smooth' });
  }
})

export default router
