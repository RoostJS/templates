{{=<% %>=}}
<template>
  <v-form
    :dark="dark"
    ref="loginForm"
    v-model="valid"
    :lazy-validate="true"
    @keyup.native.enter="valid && submit($event)"
    class="px-8 px-lg-15 w-100"
  >
    <Logo :src="logo" class="mx-auto" size="8em" />
    <div>
      <p align="center" :class="dark ? 'white--text' : 'black--text'">
        Dont have an account?
        <a v-bind:href="contactHref" class="secondary--text pl-3">Reach out to request one.</a>
      </p>
    </div>
    <v-text-field
      :dark="dark"
      color="primary"
      label="Email Address"
      v-model="user.email"
      :rules="[v => !!v || 'Required']"
      require
    ></v-text-field>
    <v-text-field
      :dark="dark"
      color="primary"
      label="Password"
      v-model="user.password"
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPass ? 'text' : 'password'"
      :rules="[v => !!v || 'Required']"
      require
      @click:append="showPass = !showPass"
    ></v-text-field>
    <v-btn :dark="dark" color="primary" class="mt-10 mb-5" :disabled="!valid" @click="submit"
      >Login</v-btn
    >
  </v-form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';

import { AuthStore, NotifyStore } from '../store';
import Logo from './Logo.vue';

@Component({ components: { Logo } })
export default class LoginForm extends Vue {
  $refs!: any;
  valid = true;
  showPass = false;
  user: { email: string; password: string } = { email: '', password: '' };

  @Prop({ default: '/' }) contactHref!: string;
  @Prop() logo!: string;
  @Prop({ type: Boolean, default: false }) dark!: boolean;

  async submit(): Promise<void> {
    try {
      await AuthStore.login(this.user);
      if (!AuthStore.isLoggedIn) {
        throw new Error();
      }

      const redirect = (this.$route.query.redirect as string) || '/';
      this.$router.replace(redirect).catch(failure => {
        if (VueRouter.isNavigationFailure(failure)) {
          NotifyStore.Error('Navigation Failed');
        }
      });
    } catch (e) {
      this.valid = false;
      this.$refs.loginForm.reset();
    }
  }
}
</script>
