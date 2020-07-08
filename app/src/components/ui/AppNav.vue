<template>
  <v-navigation-drawer
    v-model="showDrawer"
    app
    color="#76ff03"
    clipped
    light
    :permanent="$vuetify.breakpoint.mdAndUp"
    :width="'10rem'"
  >
    <template v-slot:prepend v-if="isMobile">
      <Top />
    </template>
    <template v-slot:default>
      <Main />
    </template>
    <template v-slot:append>
      <Admin />
      <v-list-item link :to="'/login'">
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
import 'reflect-metadata';
import {
  Component, Prop, PropSync, Vue,
} from 'vue-property-decorator';
import Top from './AppNav/Top.vue';
import Main from './AppNav/Main.vue';
import Admin from './AppNav/Admin.vue';

@Component({
  components: {
    Top,
    Main,
    Admin,
  },
})
export default class AppNav extends Vue {
  @Prop() readonly isMobile!: boolean;

  @PropSync('showNav', { type: Boolean }) showDrawer!: boolean;
}
</script>
