/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { loginMock, userMock, DataServiceMock } from '~/mocks';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let local: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, DataServiceMock],
    }).compile();

    local = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(local).toBeDefined();
  });

  it('should validate email/password', async () => {
    const result = await local.validate(loginMock.email, loginMock.password);
    expect(result).toEqual(userMock);
  });

  it('should not validate email/password', async () => {
    try {
      await local.validate(loginMock.email, 'someotherpassword');
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });
});
