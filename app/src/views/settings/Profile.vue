{{=<% %>=}}
<template>
  <v-container>
    <h1>User Profile</h1>
    <UserForm />
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import UserForm from '@/components/profile/UserForm.vue';

@Component({ components: { UserForm } })
export default class Profile extends Vue {}
</script>
<style lang="scss">
.profile h1,
.profile .v-icon {
  color: var(--brand-white) !important;
}
</style>
