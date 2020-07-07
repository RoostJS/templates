/* eslint-disable @typescript-eslint/no-unused-vars */
import { userMock } from './index';
export const UsersServiceMock = {
  provide: 'UsersService',
  useValue: {
    create: jest.fn(async (user: any): Promise<any> => userMock),
    findOne: jest.fn(async (id: string): Promise<any> => userMock),
    findOneByEmail: jest.fn(async (email: string): Promise<any> => userMock),
    updateOne: jest.fn(async (user: any): Promise<any> => user),
  },
};
