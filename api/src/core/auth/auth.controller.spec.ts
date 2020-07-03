import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {
  tokenMock,
  userMock,
  AuthServiceMock,
  LocalStrategyMock,
  JwtStrategyMock,
} from '../../../test/mocks';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock, LocalStrategyMock, JwtStrategyMock],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', async () => {
    const result = await controller.login({ user: userMock });
    expect(result).toEqual(tokenMock);
  });

  it('should get the current user', async () => {
    const result = await controller.getMe({ user: userMock });
    expect(result).toEqual(userMock);
  });
});
