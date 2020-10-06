// import 'vue-class-component/hooks';
import { Component } from 'vue-property-decorator';

// Register vue-router hooks
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);
