<template>
  <v-app-bar v-if="!!user.user.id" app flat clipped-left class="light-green accent-3">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="showDrawer = !showDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/">
        <AppLogo width="4rem" />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="!isMobile">
      <v-toolbar-title>howdy, {{user.fullName}}!</v-toolbar-title>
      <v-btn rounded class="purple white--text ml-4">New Instance</v-btn>
    </template>
  </v-app-bar>
</template>
<script lang="ts">
import {
  Component, Prop, PropSync, Vue,
} from 'vue-property-decorator';
import AppLogo from './AppLogo.vue';
import UserStore from '../../store/UserStore';

@Component({
  components: { AppLogo },
})
export default class AppHeader extends Vue {
  @Prop() readonly isMobile!: boolean;

  @PropSync('showNav', { type: Boolean }) showDrawer!: boolean;

  get user() {
    return UserStore;
  }
}
</script>
