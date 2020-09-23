import { IAccount } from '@/core/types';
import { UserRoles } from '@/core/constants';

export interface IUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly account: Partial<IAccount> | string;
  readonly role: UserRoles | string;
}
