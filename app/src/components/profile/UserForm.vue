{{=<% %>=}}
<template>
  <v-form v-model="valid" :lazy-validation="true">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            color="secondary"
            label="First Name"
            v-model="user.firstName"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field color="secondary" label="Last Name" v-model="user.lastName"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field color="secondary" label="Email" v-model="user.email" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field color="secondary" disabled label="Role" v-model="user.role" />
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
import { IUser, UserStore } from '@/store';

@Component({ components: {} })
export default class UserForm extends Vue {
  get user(): IUser {
    return UserStore.record;
  }

  valid = true;

  async submit(): Promise<void> {
    await UserStore.update(this.user).catch((err: Error) => console.error(err));
  }
}
</script>
