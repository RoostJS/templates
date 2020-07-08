<template>
  <v-list-group>
    <template v-slot:activator>
      <v-list-item-title>Admin</v-list-item-title>
    </template>
    <v-list-item v-for="nav in menu" :key="nav.title" link :to="nav.route">
      <v-list-item-content v-if="checkRole(nav.guard, userStore.user.role)">
        <v-list-item-title>{{nav.title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserStore from '../../../store/UserStore';
import CheckRole from '../../../utils/CheckRole';

@Component
export default class Admin extends Vue {
  menu: any[] = [
    {
      title: 'Account',
      route: '/settings/account',
      guard: 'admin',
    },
    {
      title: 'Users',
      route: '/settings/users',
      guard: 'admin',
    },
    {
      title: 'Profile',
      route: '/settings/user-profile',
      guard: 'user',
    },
  ];

  get userStore() {
    return UserStore;
  }

  get checkRole() {
    return CheckRole;
  }
}
</script>
