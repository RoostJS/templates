<template>
  <v-app>
    <template v-if="!!user.user.id">
      <AppHeader :isMobile="isMobile" :showNav.sync="showNav" />
      <AppNav :isMobile="isMobile" :showNav.sync="showNav" />
    </template>
    <v-content>
      <router-view class="px-12 py-9"></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserStore from '@/store/UserStore';

// Components
import AppHeader from './components/ui/AppHeader.vue';
import AppNav from './components/ui/AppNav.vue';

@Component({
  components: { AppHeader, AppNav },
})
export default class App extends Vue {
  get isMobile(): boolean {
    const mobileNames = ['md', 'sm', 'xs'];
    return mobileNames.indexOf(this.$vuetify.breakpoint.name) > -1;
  }

  get user() {
    return UserStore;
  }

  showNav = false;
}
</script>
