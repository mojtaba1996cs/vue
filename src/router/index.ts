import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Purchases from '../views/Purchases.vue';
import Stock from '../views/Stock.vue';
import Sales from '../views/Sales.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: Purchases,
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock,
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales,
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
