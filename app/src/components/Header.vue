{{=<% %>=}}
<template>
  <v-app-bar v-if="isLoggedIn" app clipped-left>
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mobile"
      @click.stop="showDrawer = !showDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/">
        <Logo src="roost-logo.svg" v-if="$vuetify.breakpoint.mobile" toolbar size="16%" />
        <Logo v-else src="roost-logo.svg" toolbar size="8%" />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <QuickActionButton v-if="!$vuetify.breakpoint.mobile" buttonText="Click Here" />
  </v-app-bar>
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

// Core
import Logo from '@/core/components/Logo.vue';
import QuickActionButton from '@/core/components/QuickActionButton.vue';

// Store
import { AuthStore } from '@/store';

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
