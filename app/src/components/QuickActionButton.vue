<template>
  <v-btn :block="$vuetify.breakpoint.mobile" large outlined color="primary" :to="'/'">
    Quick Action
  </v-btn>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class QuickActionButton extends Vue {}
</script>
