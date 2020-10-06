// store/UserStore.ts
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { transformAndValidate } from 'class-transformer-validator';

import { AxiosResponse, ApiClient, IAPIClient } from '@/utils/ApiClient';
import { getFromLocal, saveToLocal } from '@/utils/LocalStorage';
import { AccountStore, IAccount, IUser, NotifyStore, UserModel } from '@/store';
import store from '@/store/store';

/**
 * User Store
 */
@Module({
  name: 'UserStore',
  namespaced: true,
  dynamic: true,
  store,
})
class UserStoreClass extends VuexModule {
  /**
   * User Property
   */
  user: Partial<IUser> = getFromLocal('User');

  /**
   * Api Client
   */
  api: IAPIClient = new ApiClient();

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

    AccountStore.ADD_ACCOUNT(this.user.account as IAccount);
    saveToLocal('User', this.user);
  }

  @Mutation
  LOGOUT(): void {
    this.user = {};
    saveToLocal('User', this.user);
    AccountStore.REMOVE_ACCOUNT();
    this.api = new ApiClient();
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async addUser(user: Partial<IUser>): Promise<IUser> {
    try {
      const response: AxiosResponse = await this.api.client.post('/api/v1/users', user);
      return transformAndValidate(UserModel, response.data as IUser, {
        transformer: { excludeExtraneousValues: true },
      });
    } catch (error) {
      NotifyStore.Error(error);
      throw error;
    }
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async updateUser(user: Partial<IUser>): Promise<IUser> {
    try {
      const response: AxiosResponse = await this.api.client.post(`/api/v1/me`, user);
      const data = { ...user, ...response.data };
      return await transformAndValidate(UserModel, data as IUser, {
        transformer: { excludeExtraneousValues: true },
      });
    } catch (error) {
      NotifyStore.Error(error);
      throw error;
    }
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async getUser(id: string): Promise<IUser> {
    try {
      const response: AxiosResponse = await this.api.client.get(`/api/v1/users/${id}`);
      return response.data;
    } catch (error) {
      NotifyStore.Error(error);
      throw error;
    }
  }

  @Action({ commit: 'ADD_USER', rawError: true })
  async login(user: Partial<IUser>): Promise<IUser> {
    try {
      const response: AxiosResponse = await this.api.client.post('/api/v1/auth/login', user);
      this.api.client.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

      const meResponse: AxiosResponse = await this.api.client.get('/api/v1/me');
      const newUser = meResponse.data;
      newUser.token = response.data.token;
      return newUser;
    } catch (error) {
      NotifyStore.Error(error);
      throw error;
    }
  }

  /**
   * Check if user has provided role
   */
  @Action({ rawError: true })
  async roleCheck(role: string | boolean): Promise<boolean> {
    try {
      // No role required
      if (!role) {
        return true;
      }
      // User has role
      role = role as string; // type cast
      const response: AxiosResponse = await this.api.client.get(`/api/v1/auth/role/${role}`);
      return response.data.status;
    } catch (e) {
      NotifyStore.Error(e.message);
      return false;
    }
  }
}

export const UserStore = getModule(UserStoreClass);
