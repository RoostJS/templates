import axios, { AxiosInstance, AxiosResponse } from 'axios';

const ApiClient: AxiosInstance = axios.create({
  baseURL: `//${process.env.VUE_APP_API_HOST}/`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export { ApiClient, AxiosResponse };
