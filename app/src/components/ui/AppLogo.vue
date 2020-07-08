<template>
  <v-avatar
    height="auto"
    :tile="tile"
    :size="size"
    :color="color"
  >
    <img src="https://broken.place/wp-content/uploads/2020/02/Untitled-Copy.png" />
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppLogo extends Vue {
  /**
   * Tile Prop
   *
   * @var {boolean}
   */
  @Prop({ default: true }) tile!: boolean;

  /**
   * Size Prop
   *
   * @var {number}
   */
  @Prop({ default: 48 }) size!: number;

  /**
   * Color Prop
   *
   * @var {string}
   */
  @Prop() color?: string;
}
</script>
