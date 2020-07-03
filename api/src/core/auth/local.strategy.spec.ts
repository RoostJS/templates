/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { userMock, AuthServiceMock } from '../../../test/mocks';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let local: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, AuthServiceMock],
    }).compile();

    local = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(local).toBeDefined();
  });

  it('should validate email/password', async () => {
    const result = await local.validate(userMock.email, userMock.password);
    expect(result).toEqual(userMock);
  });

  it('should not validate email/password', async () => {
    try {
      const result = await local.validate(userMock.email, 'someotherpassword');
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });
});
