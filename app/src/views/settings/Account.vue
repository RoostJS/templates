<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Account Settings</h1>
      </v-col>
    </v-row>
    <v-row v-if="account">
      <v-col>
        <h2>Account Name: {{account.name}}</h2>
        <h2>Account Type: {{account.type}}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppLogo from '../../components/ui/AppLogo.vue';
import AccountStore from '../../store/AccountStore';

@Component({
  components: {
    AppLogo,
  },
})
export default class Account extends Vue {
  get account() {
    return AccountStore.account;
  }
}
</script>
