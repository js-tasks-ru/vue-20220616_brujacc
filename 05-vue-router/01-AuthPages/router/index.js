import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from '../views/PageIndex';
import PageLogin from '../views/PageLogin';
import PageRegister from '../views/PageRegister';

const routes = [
  {
    path: '/',
    name: 'main',
    component: PageIndex,
  },
  {
    path: '/login',
    name: 'login',
    component: PageLogin,
  },
  {
    path: '/register',
    name: 'register',
    component: PageRegister,
  },
];

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes,
});
