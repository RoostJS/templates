import { IAccount } from '../accounts/account.interface';

export interface IUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly phone: string;
  readonly email: string;
  readonly account: Partial<IAccount> | string;
}
