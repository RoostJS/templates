{{=<% %>=}}
<template>
  <v-app-bar v-if="isLoggedIn" app clipped-left>
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mobile"
      @click.stop="showDrawer = !showDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/">
        <Logo v-if="$vuetify.breakpoint.mobile" toolbar size="50%" />
        <Logo v-else toolbar size="25%" />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <QuickActionButton v-if="!$vuetify.breakpoint.mobile" />
  </v-app-bar>
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

// Core modules
import { AuthStore, UserStore } from '@/core/store';
import Logo from '@/core/components/Logo.vue';
import QuickActionButton from '@/core/components/QuickActionButton.vue';

@Component({
  components: { Logo, QuickActionButton },
})
export default class Header extends Vue {
  @PropSync('showNav', { type: Boolean }) showDrawer!: boolean;

  get isLoggedIn(): boolean {
    return AuthStore.isLoggedIn;
  }
}
</script>
