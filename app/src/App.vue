<template>
  <v-app>
    <template v-if="!!user.user.id">
      <Notification />
      <Header :showNav.sync="showNav" />
      <Nav :showNav.sync="showNav" />
    </template>
    <v-main>
      <router-view class="px-12 py-9"></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { NotifyStore, UserStore } from '@/store';

// Components
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import Notification from './components/Notification.vue';

@Component({
  components: { Header, Nav, Notification },
})
export default class App extends Vue {
  get user(): typeof UserStore {
    return UserStore;
  }

  showNav = false;

  showNotice(): void {
    NotifyStore.Alert('SOMETHING WENT WRONG!');
  }
}
</script>
