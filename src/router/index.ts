import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'projectlist',
        name: 'projectlist',
        component: () => import('@/views/ProjectListView.vue'),
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/testView.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingView.vue'),
      },
    ],
  },
]

export default createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})
