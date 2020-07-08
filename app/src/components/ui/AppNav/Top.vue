<template>
  <v-list nav>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>howdy, {{user.fullName}}!</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserStore from '../../../store/UserStore';

@Component
export default class Top extends Vue {
  get user() {
    return UserStore;
  }
}
</script>
