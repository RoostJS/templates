/* eslint-disable import/prefer-default-export */
import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule,
} from 'vuex-module-decorators';
import { transformAndValidate } from 'class-transformer-validator';
import { getFromLocal, saveToLocal } from '@/utils/LocalStorage';
import store from './index';
import { IAccount, AccountModel } from './models/AccountModel';
import { IUser } from './models/UserModel';

const getAccountFromUser = (): IAccount => {
  const user = getFromLocal('User');
  return user?.account;
};

/**
 * Account Store
 */
@Module({
  name: 'AccountStore',
  namespaced: true,
  dynamic: true,
  store,
})
class AccountStore extends VuexModule {
  /**
   * Account property
   */
  account: IAccount = getAccountFromUser()

  @Mutation
  UPDATE_ACCOUNT(account: IAccount): void {
    const user: IUser = getFromLocal('User') as IUser;
    this.account = account;
    user.account = account;
    saveToLocal('User', user);
  }

  @Action({ commit: 'UPDATE_ACCOUNT', rawError: true })
  async updateAccount(data: Partial<IAccount>): Promise<IAccount> {
    const account = { ...this.account, data };
    return transformAndValidate(
      AccountModel,
      account,
      { transformer: { excludeExtraneousValues: true } },
    );
  }
}

export default getModule(AccountStore);
