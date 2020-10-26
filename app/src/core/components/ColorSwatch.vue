{{=<% %>=}}
<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col v-for="color in colors" :key="color" cols="auto">
        <v-sheet
          elevation="8"
          :color="color"
          :height="size"
          :width="size"
          class="d-flex justify-center align-center"
        >
          <h3>{{ color }}</h3>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ColorSwatch extends Vue {
  colors: string[] = ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'];
  size = this.colors.length + 'em';
}
</script>
