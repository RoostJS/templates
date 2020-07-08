<template>
  <div class="d-flex align-center py-12">
    <AppLogo width="10rem" height="10rem" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppLogo from '../components/ui/AppLogo.vue';

@Component({
  components: { AppLogo },
})
export default class Home extends Vue {}
</script>
