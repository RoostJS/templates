{{=<% %>=}}
<template>
  <v-form v-model="valid" :lazy-validate="true" @keyup.native.enter="valid && submit($event)">
    <v-row>
      <v-col>
        <v-container>
          <v-row no-gutters>
            <v-col align="center">
              <Logo color="dark" class="login-logo" size="15em" />
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-container>
                <v-row>
                  <v-col align="center">
                    <h1 align="center">Log In</h1>
                  </v-col>
                </v-row>
                <v-row justify="center" align-content="center">
                  <p align="center">Dont have an account?</p>
                  <a style="padding-left: 10px" href="/">
                    Reach out to request one.
                  </a>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                color="secondary"
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
                color="secondary"
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
              <v-btn color="secondary" :disabled="!valid" @click="submit"> Login </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="authError">
            <v-col>
              <v-alert type="error" elevation="0">{{ authError }}</v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col sm="8" class="d-md-none d-sm-none d-none d-lg-flex">
        <v-container fill-height fluid>
          <v-row justify="center" align-content="center" align="center">
            <v-col justify="center" align-content="center">
              <h1 align="center">
                This is some area to promote stuff
              </h1>
              <h3 align="center">
                And some subcontent to support the above statement.
              </h3>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import { UserStore } from '@/store';

// Components
import Logo from '@/components/Logo.vue';

@Component({
  components: { Logo },
})
export default class Login extends Vue {
  valid = true;

  showPass = false;

  user: any = {
    email: '',
    password: '',
  };

  authError = '';

  async submit(): Promise<void> {
    try {
      await UserStore.login(this.user);
      const redirect = (this.$route.query.redirect as string) || '/';
      this.$router.replace(redirect).catch(failure => {
        if (VueRouter.isNavigationFailure(failure)) {
          console.log('Navigation Failed');
        }
      });
    } catch (e) {
      console.log(e);
      this.authError = `Login failed for ${this.user.email}`;
      this.valid = false;
    }
  }
}
</script>
