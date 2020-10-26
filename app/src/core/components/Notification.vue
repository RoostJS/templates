{{=<% %>=}}
<template>
  <v-snackbar v-model="notify" app centered :color="notice.color" top multi-line>
    <h2>{{ notice.message }}</h2>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="notify = false"><v-icon large>mdi-close</v-icon></v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { INotice, NotifyStore } from '../store';

@Component({})
export default class Notification extends Vue {
  get notice(): INotice {
    return NotifyStore.notice;
  }
  get notify(): boolean {
    return NotifyStore.notice.visible;
  }
  set notify(e: boolean) {
    NotifyStore.SET_NOTICE_VISIBILITY(e);
  }
}
</script>
