/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {
  userMock,
  tokenMock,
  DataServiceMock,
  JwtServiceMock,
} from '../../../test/mocks';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, DataServiceMock, JwtServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    const { password, ...user } = userMock;
    const result = await service.validateUser(userMock.email, 'somepassword');
    expect(result).toEqual(user);
  });

  it('should login a user', async () => {
    const result = await service.login(userMock);
    expect(result).toEqual(tokenMock);
  });
});