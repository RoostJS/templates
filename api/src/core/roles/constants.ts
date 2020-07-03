export enum UserRoles {
  SUPER = 'super',
  ADMIN = 'admin',
  USER = 'user',
}

export interface IRole {
  role: string;
  priority: number;
}

export const Roles: IRole[] = [
  {
    role: UserRoles.SUPER,
    priority: 10,
  },
  {
    role: UserRoles.ADMIN,
    priority: 5,
  },
  {
    role: UserRoles.USER,
    priority: 1,
  },
];
