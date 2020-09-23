import { IUser } from '@/core/types';

export interface IAccount {
  readonly id: string;
  readonly name: string;
  readonly users?: Partial<IUser>[] | string[];
}
