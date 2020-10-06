// store/UserStore.ts
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { transformAndValidate } from 'class-transformer-validator';
import { AxiosResponse, ApiClient, IAPIClient } from '@/utils/ApiClient';
import { getFromLocal, saveToLocal } from '@/utils/LocalStorage';
import { IAccount, AccountModel, NotifyStore } from '@/store';
import store from '@/store/store';

/**
 * Account Store
 */
@Module({
  name: 'AccountStore',
  namespaced: true,
  dynamic: true,
  store,
})
class AccountStoreClass extends VuexModule {
  /**
   * User Property
   */
  account: Partial<IAccount> = getFromLocal('Account');

  /**
   * Api Client
   */
  api: IAPIClient = new ApiClient();

  @Mutation
  ADD_ACCOUNT(account: IAccount): void {
    if (!this.account) {
      this.account = account;
    } else {
      this.account = { ...this.account, ...account };
    }

    saveToLocal('Account', this.account);
  }

  @Mutation
  REMOVE_ACCOUNT(): void {
    this.account = {};
    saveToLocal('Account', {});
  }

  @Action({ commit: 'ADD_ACCOUNT', rawError: true })
  async add(account: Partial<IAccount>): Promise<IAccount> {
    try {
      const response: AxiosResponse = await this.api.client.post('/api/v1/accounts', account);
      return transformAndValidate(AccountModel, response.data as IAccount, {
        transformer: { excludeExtraneousValues: true },
      });
    } catch (error) {
      NotifyStore.Error(error.message);
      throw error;
    }
  }

  @Action({ commit: 'ADD_ACCOUNT', rawError: true })
  async update(account: Partial<IAccount>): Promise<IAccount> {
    try {
      const response: AxiosResponse = await this.api.client.post(
        `/api/v1/accounts/${account.id}`,
        account
      );
      const data = { ...account, ...response.data };
      const resp = await transformAndValidate(AccountModel, data as IAccount, {
        transformer: { excludeExtraneousValues: true },
      });
      return resp;
    } catch (error) {
      NotifyStore.Error(error.message);
      throw error;
    }
  }

  @Action({ commit: 'ADD_ACCOUNT', rawError: true })
  async get(id: string): Promise<IAccount> {
    try {
      const response: AxiosResponse = await this.api.client.get(`/api/v1/accounts/${id}`);
      return response.data;
    } catch (error) {
      NotifyStore.Error(error.message);
      throw error;
    }
  }
}

export const AccountStore = getModule(AccountStoreClass);
