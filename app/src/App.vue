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
import { AuthStore } from './core/store';
import Notification from './core/components/Notification.vue';

// Components
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';

@Component({
  components: { Header, Nav, Notification },
})
export default class App extends Vue {
  get isMobile(): boolean {
    const mobileNames = ['md', 'sm', 'xs'];
    return mobileNames.indexOf(this.$vuetify.breakpoint.name) > -1;
  }

  get isLoggedIn(): boolean {
    return AuthStore.isLoggedIn;
  }

  showNav = false;
}
</script>
