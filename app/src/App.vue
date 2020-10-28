{{=<% %>=}}
<template>
  <v-app>
    <Notification />
    <template v-if="isLoggedIn">
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

// Core
import Notification from './core/components/Notification.vue';

// Store
import { AuthStore } from './store';

// Components
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';

@Component({
  components: { Header, Nav, Notification },
})
export default class App extends Vue {
  get isLoggedIn(): boolean {
    return AuthStore.isLoggedIn;
  }

  showNav = false;
}
</script>
