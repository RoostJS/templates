/* eslint-disable import/prefer-default-export */
// store/UserStore.ts
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';
import { transformAndValidate } from 'class-transformer-validator';
import { ApiClient, AxiosResponse } from '@/utils/ApiClient';
import { getFromLocal, saveToLocal } from '@/utils/LocalStorage';
import store from './index';

import { IUser, UserModel } from './models/UserModel';

/**
 * User Store
 */
@Module({
  name: 'UserStore',
  namespaced: true,
  dynamic: true,
  store,
})
class UserStore extends VuexModule {
  /**
   * User Property
   */
  user: Partial<IUser> = getFromLocal('User')

  get fullName(): string {
    return `${this.user?.firstName || ''} ${this.user?.lastName || ''}`;
  }

  @Mutation
  ADD_USER(user: IUser): void {
    if (!this.user) {
      this.user = user;
    } else {
      this.user = { ...this.user, ...user };
    }

    saveToLocal('User', this.user);
  }

  @Mutation
  LOGOUT(): void {
    this.user = {};
    saveToLocal('User', this.user);
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async addUser(user: Partial<IUser>): Promise<IUser> {
    const response: AxiosResponse = await ApiClient.post('/api/v1/users', user);
    return transformAndValidate(
      UserModel,
      response.data as IUser,
      { transformer: { excludeExtraneousValues: true } },
    );
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async getUser(id: string): Promise<IUser> {
    const response: AxiosResponse = await ApiClient.get(`/api/v1/users/${id}`);
    return response.data;
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async login(user: Partial<IUser>): Promise<IUser> {
    const response: AxiosResponse = await ApiClient.post('/api/v1/auth/login', user);
    ApiClient.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    const meResponse: AxiosResponse = await ApiClient.get('/api/v1/auth/me');
    return meResponse.data;
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async updateUser(user: Partial<IUser>): Promise<IUser> {
    const response: AxiosResponse = await ApiClient.post(`/api/v1/users/${this.user.id}`, user);
    return response.data;
  }
}

export default getModule(UserStore);
