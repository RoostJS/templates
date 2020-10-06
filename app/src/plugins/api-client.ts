import Vue from 'vue';
import VueAxios from 'vue-axios';
import { ApiClient } from '@/utils/ApiClient';

const client = new ApiClient();
Vue.use(VueAxios, client.client);
