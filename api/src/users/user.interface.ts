import { IAccount, UserRoles } from '@/types';

export interface IUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly account: IAccount | string;
  readonly role: UserRoles | string;
}

export interface INewUser {
  readonly email: string;
  readonly account: string;
  readonly role: UserRoles | string;
}