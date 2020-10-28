{{=<% %>=}}
<template>
  <main align="center">
    <Logo src="roost-logo.svg" size="25%" class="mx-auto" />
    <h1>RoostJS</h1>
    <ColorSwatch />
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Core
import Logo from '@/core/components/Logo.vue';
import ColorSwatch from '@/core/components/ColorSwatch.vue';

@Component({
  components: { ColorSwatch, Logo },
})
export default class Home extends Vue {}
</script>
