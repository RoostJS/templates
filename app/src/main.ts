import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// App SCSS
import './app.scss';

// PWA Support
import './registerServiceWorker';

// Plugins
import vuetify from './plugins/vuetify';
import './plugins/api-client';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
