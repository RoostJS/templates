{{=<% %>=}}
<template>
  <v-toolbar-items v-if="toolbar">
    <img :src="imageSrc" :width="size" :height="size" />
  </v-toolbar-items>
  <v-img v-else class="pb-0" contain :src="imageSrc" :width="size" :height="size" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
  /**
   * Image Source
   *
   * @var {string}
   */
  @Prop() src!: string;

  /**
   * Size Prop
   *
   * @var {number}
   */
  @Prop({ default: '100%' }) size!: string;

  /**
   * Toolbar Prop
   * Conditions the output to a regular <img>
   *
   * @var {boolean}
   */
  @Prop({ type: Boolean, default: false }) toolbar!: boolean;

  /**
   * Color Prop
   * @note Can only be one of "accent" or "primary"
   *
   * @var {string} color accent | primary
   */
  @Prop({ default: 'accent' }) color!: 'accent' | 'primary';

  private get imageSrc(): any {
    return require(`@/assets/${this.src}`);
  }
}
</script>
