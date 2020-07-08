<template>
  <v-list nav>
    <v-list-item v-for="nav in menu" :key="nav.title" link :to="nav.route">
      <v-list-item-content>
        <v-list-item-title>{{ nav.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  menu: any[] = [
    {
      title: 'Instances',
      route: '/instances',
    },
    {
      title: 'Billing',
      route: '/billing',
    },
    {
      title: 'Support',
      route: '/support',
    },
  ];
}
</script>
