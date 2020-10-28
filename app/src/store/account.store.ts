// store/UserStore.ts
import { ISingleRecordStoreOptions, SingleRecordFactory } from '@/core/store';

/**
 * Account Interface
 */
export interface IAccount {
  id: string;
  name: string;
  type: string;
}

/**
 * New Account interface
 */
export interface INewAccount {
  name: string;
  type: string;
}

/**
 * Account Store options
 *
 * @var {ISingleRecordStoreOptions}
 */
const options: ISingleRecordStoreOptions = {
  name: 'Account',
  url: 'accounts',
};

/**
 * Account Store
 */
export const AccountStore = SingleRecordFactory<IAccount, INewAccount>(options);
