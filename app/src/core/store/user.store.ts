// store/UserStore.ts
import { ApiClient } from '../utils/ApiClient';
import { ISingleRecordStoreOptions, SingleRecordFactory } from './single-record.factory';
import { NotifyStore } from './notify.store';
import store from './store';

import { IAccount } from './account.store';

/**
 * User Model Interface
 */
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  account: string | IAccount;
  token?: string;
}

/**
 * New User Interface
 */
export interface INewUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  account: string | IAccount;
}

/**
 * Store Options
 *
 * @var {ISingleRecordStoreOptions}
 */
const options: ISingleRecordStoreOptions = {
  name: 'User',
  url: 'users',
  client: new ApiClient().client,
  notify: NotifyStore,
  store,
};

/**
 * User Store
 */
export const UserStore = SingleRecordFactory<IUser, INewUser>(options);
