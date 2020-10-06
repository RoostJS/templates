<template>
  <Logo />
  <h1>RoostJS</h1>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';

@Component({
  components: { Logo },
})
export default class Home extends Vue {}
</script>
