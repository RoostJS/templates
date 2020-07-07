/* eslint-disable @typescript-eslint/no-unused-vars */
import { tokenMock, userMock } from './index';
export const AuthServiceMock = {
  provide: 'AuthService',
  useValue: {
    validateUser: jest.fn(
      async (email: string, pass: string): Promise<any> => userMock,
    ),
    login: jest.fn(async (user: any): Promise<any> => tokenMock),
  },
};
