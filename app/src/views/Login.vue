<template>
  <v-form
    v-model="valid"
    :lazy-validate="true"
    @keyup.native.enter="valid && submit($event)"
  >
    <v-container>
      <v-row>
        <v-col>
          <h1>Login</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Email Address"
            v-model="user.email"
            :rules="[v => !!v || 'Required']"
            require
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Password"
            v-model="user.password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            :rules="[v => !!v || 'Required']"
            require
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="#9c27b0" dark :disabled="!valid" @click="submit">Login</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="authError">
        <v-col>
          <v-alert type="error" elevation="0">{{authError}}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IUser } from '@/store/models/UserModel';
import UserStore from '@/store/UserStore';

@Component({})
export default class Login extends Vue {
  valid = true;

  showPass = false;

  user: Partial<IUser> = {
    email: '',
    password: '',
  };

  authError = '';

  async submit(): Promise<void> {
    try {
      await UserStore.login(this.user);
      this.$router.replace('/');
    } catch (e) {
      this.authError = `Login failed for ${this.user.email}`;
      this.valid = false;
    }
  }
}
</script>
