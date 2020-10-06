import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { UserStore } from '@/store';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      requiresAuth: false,
      requiresRole: false,
    },
  },
  {
    path: '/settings/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/Account.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'admin',
    },
  },
  {
    path: '/settings/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/Profile.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: '/settings/support',
    name: 'Support',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/Support.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Requires Auth Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && !UserStore.user.id) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else if (to.name === 'Login' && UserStore.user.id) {
    UserStore.LOGOUT();
    next();
  } else {
    next();
  }
});

// Gated Access Navigation Guard
router.beforeEach(async (to, from, next) => {
  const redirect = from.name === 'Login' ? { name: 'Home' } : false;
  // If role is not required, continue
  if (!to.meta || !to.meta.requiresRole) {
    next();
  }

  // User is logged in but has no role (should never get here)
  else if (!UserStore.user.role) {
    UserStore.LOGOUT();
    next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  // Role required, check access level
  else if (await UserStore.roleCheck(to.meta.requiresRole)) {
    next();
  }

  // Fallback to invalid login
  else {
    next(redirect);
  }
});

export default router;
