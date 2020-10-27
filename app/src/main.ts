import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './core/store/store';

// Global Styles
import './app.scss';

// Plugins
import vuetify from './plugins/vuetify';
import './core/plugins/api-client';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
