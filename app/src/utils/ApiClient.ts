import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getFromLocal } from './LocalStorage';
import { IUser } from '@/store';

interface IAPIClient {
  config: AxiosRequestConfig;
  user: IUser;
  client: AxiosInstance;
}

class ApiClient {
  config!: AxiosRequestConfig;
  user!: IUser;
  client!: AxiosInstance;

  constructor() {
    this.user = (getFromLocal('User') as IUser) || {};
    this.config = this.getConfig();
    this.client = this.newClient();
  }

  private getConfig(): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      baseURL: `//${process.env.VUE_APP_API_HOST}/`,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };

    if (this.user.token) {
      config.headers.Authorization = `Bearer ${this.user.token}`;
    }

    return config;
  }

  private newClient(): AxiosInstance {
    return axios.create(this.config);
  }
}
export { AxiosResponse, AxiosInstance, ApiClient, IAPIClient };
