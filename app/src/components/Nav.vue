{{=<% %>=}}
<template>
  <v-navigation-drawer
    v-model="showDrawer"
    app
    clipped
    :permanent="$vuetify.breakpoint.mdAndUp"
    :expand-on-hover="$vuetify.breakpoint.mdAndUp"
    :mini-variant="$vuetify.breakpoint.mdAndUp"
    width="12em"
  >
    <template v-slot:prepend>
      <v-list-item v-show="$vuetify.breakpoint.mobile">
        <v-list-item-content>
          <QuickActionButton :outlined="false" buttonText="Click Here" />
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:default>
      <NavList :list="MainNav" />
    </template>
    <template v-slot:append>
      <NavList :list="BottomNav" />
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
import 'reflect-metadata';
import { Component, PropSync, Vue } from 'vue-property-decorator';

// Core
import QuickActionButton from '@/core/components/QuickActionButton.vue';

// Components
import NavList, { INavItem } from '@/components/nav/NavList.vue';

@Component({
  components: { NavList, QuickActionButton },
})
export default class Nav extends Vue {
  @PropSync('showNav', { type: Boolean }) showDrawer!: boolean;

  TopNav: INavItem[] = [
    {
      title: 'Quick Action',
      route: '/',
      guard: false,
      icon: false,
      button: true,
    },
  ];
  MainNav: INavItem[] = [
    {
      title: 'Home',
      route: '/',
      guard: false,
      icon: 'mdi-home',
    },
  ];
  BottomNav: INavItem[] = [
    {
      title: 'Profile',
      route: '/settings/profile',
      guard: false,
      icon: 'mdi-account',
    },
    {
      title: 'Account',
      route: '/settings/account',
      guard: 'owner',
      icon: 'mdi-account-details',
    },
    {
      title: 'Support',
      route: '/settings/support',
      guard: false,
      icon: 'mdi-lifebuoy',
    },
    {
      title: 'Logout',
      route: '/login',
      guard: false,
      icon: 'mdi-logout',
    },
  ];
}
</script>
