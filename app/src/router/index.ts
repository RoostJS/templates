import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import { IUser } from '@/store/models/UserModel';
import UserStore from '@/store/UserStore';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/billing',
    name: 'Billing',
    component: () => import(/* webpackChunkName: "billing" */ '../views/Billing.vue'),
  },
  {
    path: '/settings/user-profile',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "settings_user_profile" */ '../views/settings/UserProfile.vue'),
  },
  {
    path: '/settings/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "settings_account" */ '../views/settings/Account.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Global Nav Guards
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !UserStore.user.id) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && UserStore.user.id) {
    UserStore.LOGOUT();
    next();
  } else {
    next();
  }
});

export default router;
