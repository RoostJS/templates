import { IGeneralObj } from '../types';

export const jwtConstants: IGeneralObj = {
  secret: process.env.JWT_SECRET,
};

export enum UserRoles {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

export interface IRole {
  role: string;
  priority: number;
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
