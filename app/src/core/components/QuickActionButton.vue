{{=<% %>=}}
<template>
  <v-btn :outlined="outlined" large :color="color" :to="'/'">
    {{ buttonText }}
  </v-btn>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class QuickActionButton extends Vue {
  /**
   * Color Prop
   *
   * @var {string} color
   */
  @Prop({ default: 'primary' }) color!: string;

  /**
   * Outline Prop
   *
   * @var {boolean} outlined
   */
  @Prop({ type: Boolean, default: true }) outlined!: boolean;

  /**
   * Button Text
   *
   * @var {string} buttonText
   */
  @Prop() buttonText!: string;
}
</script>
<style lang="scss" scoped>
.v-btn:before {
  background-color: transparent;
}
</style>
