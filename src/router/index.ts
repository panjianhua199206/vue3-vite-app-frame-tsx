import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes,
});

export default router;