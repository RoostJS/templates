// store/UserStore.ts
import { ApiClient } from '../utils/ApiClient';
import { ISingleRecordStoreOptions, SingleRecordFactory } from './single-record.factory';
import { NotifyStore } from './notify.store';
import store from './store';

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
  client: new ApiClient().client,
  notify: NotifyStore,
  store,
};

/**
 * Account Store
 */
export const AccountStore = SingleRecordFactory<IAccount, INewAccount>(options);
