{{=<% %>=}}
<template>
  <v-form v-model="valid" :lazy-validation="true">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            color="secondary"
            label="Account Name"
            v-model="account.name"
            :rules="[(v) => !!v || 'Required']"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="secondary" :disabled="!valid" @click="submit">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Store
import { IAccount, AccountStore } from '@/store';

@Component({})
export default class AccountForm extends Vue {
  valid = true;

  get account(): IAccount {
    return AccountStore.record;
  }

  async submit(): Promise<void> {
    await AccountStore.update(this.account).catch((err: Error) => console.error(err));
  }
}
</script>
