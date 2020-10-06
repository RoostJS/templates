<template>
  <v-list nav flat v-if="list.length">
    <v-list-item-group color="primary" v-model="item">
      <RoleGuard v-for="item in list" :key="item.title" :role="item.guard">
        <v-list-item v-if="!item.button" link :to="item.route">
          <v-list-item-icon v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn v-else outlined large block color="primary" :to="item.route">{{ item.title }}</v-btn>
      </RoleGuard>
    </v-list-item-group>
  </v-list>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RoleGuard from '@/components/RoleGuard.vue';

export interface INavItem {
  title: string;
  route: string;
  guard: boolean | string;
  icon: boolean | string;
  button?: boolean;
}

@Component({
  components: { RoleGuard },
})
export default class NavList extends Vue {
  /**
   * List of nav items
   *
   * @var {INavItem[]}
   */
  @Prop() list!: INavItem[];

  private item = null;
}
</script>
