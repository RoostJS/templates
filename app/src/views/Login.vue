{{=<% %>=}}
<template>
  <v-container fluid class="d-flex align-stretch login-container" style="height: 100%">
    <v-row no-gutters>
      <v-col cols="12" lg="4" class="d-flex align-center justify-center black">
        <LoginForm contactHref="/" dark logo="logo-white.svg" />
      </v-col>
      <v-col cols="8" class="d-none d-lg-flex align-center justify-center primary white--text">
        <div class="d-lg-flex flex-lg-column">
          <h1 align="center">This is content promotion area</h1>
          <h2 align="center">And some subcontent to support the above statement</h2>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Core Components
import LoginForm from '@/core/components/LoginForm.vue';
import ColorSwatch from '@/core/components/ColorSwatch.vue';

@Component({
  components: { ColorSwatch, LoginForm },
})
export default class Login extends Vue {}
</script>
<style lang="scss" scoped>
.login-container {
  padding: 0 !important;
}
</style>
