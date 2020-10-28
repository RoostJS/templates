// store/UserStore.ts
import { ISingleRecordStoreOptions, SingleRecordFactory } from '@/core/store';

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
};

/**
 * User Store
 */
export const UserStore = SingleRecordFactory<IUser, INewUser>(options);
