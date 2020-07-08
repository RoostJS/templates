import Vue from 'vue';
import VueAxios from 'vue-axios';
import { ApiClient } from '@/utils/ApiClient';

Vue.use(VueAxios, ApiClient);
