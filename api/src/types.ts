import { IRole } from '@/core/types';

export * from './accounts/account.interface'
export * from './users/user.interface'

export enum UserRoles {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

export const Roles: IRole[] = [
  {
    role: UserRoles.ADMIN,
    priority: 10,
  },
  {
    role: UserRoles.OWNER,
    priority: 5,
  },
  {
    role: UserRoles.USER,
    priority: 1,
  },
];