{{=<% %>=}}
<template>
  <fragment v-if="hasRole">
    <slot></slot>
  </fragment>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import { AuthStore } from '../store';

@Component({
  components: { Fragment },
})
export default class RoleGuard extends Vue {
  @Prop() role!: string | boolean;

  private hasRole = false;

  async mounted(): Promise<void> {
    this.hasRole = await AuthStore.roleCheck(this.role);
  }
}
</script>
