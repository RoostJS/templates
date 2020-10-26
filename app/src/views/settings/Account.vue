{{=<% %>=}}
<template>
  <v-container>
    <h1>Account Settings</h1>
    <AccountForm />
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AccountForm from '@/components/profile/AccountForm.vue';

@Component({ components: { AccountForm } })
export default class Account extends Vue {}
</script>
