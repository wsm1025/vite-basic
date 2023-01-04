import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/@/views/Home.vue';
import About from '/@/views/About.tsx';
import Test from '/@/views/Test.vue';

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
  { path: '/about', name: 'about', component: About, meta: { title: '关于我' } },
  { path: '/test', name: 'test', component: Test, meta: { title: '测试' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
