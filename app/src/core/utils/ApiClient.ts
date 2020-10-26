import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getFromLocal } from './LocalStorage';

interface IAPIClient {
  config: AxiosRequestConfig;
  user: any;
  client: AxiosInstance;
}

class ApiClient {
  config!: AxiosRequestConfig;
  user!: any;
  client!: AxiosInstance;

  constructor(apiPrefix: string = 'api', apiVersion: string = 'v1') {
    this.user = getFromLocal('User') || {};
    this.config = this.getConfig(apiPrefix, apiVersion);
    this.client = this.newClient();
  }

  private getConfig(apiPrefix: string, apiVersion: string): AxiosRequestConfig {
    const host = process.env.VUE_APP_API_HOST || 'localhost';
    const config: AxiosRequestConfig = {
      baseURL: `//${host}/${apiPrefix}/${apiVersion}`,
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
