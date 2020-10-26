import { IUser } from '@/types';

export interface IAccount {
  readonly id: string;
  readonly name: string;
  readonly users?: Partial<IUser>[] | string[];
}

export interface INewAccount {
  readonly name: string;
}