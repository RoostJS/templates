import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        primary: '#42c8f4',
        accent: '#F17348',
        secondary: '#757780',
        success: '#76B041',
        info: '#2196F3',
        warning: '#F28123',
        error: '#EC0B43',
      },
      light: {
        primary: '#42c8f4',
        accent: '#F17348',
        secondary: '#757780',
        success: '#76B041',
        info: '#2196F3',
        warning: '#F28123',
        error: '#EC0B43',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
