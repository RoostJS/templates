import { IUser } from '../users/user.interface';

export interface IAccount {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly users?: Partial<IUser>[] | string[];
}
