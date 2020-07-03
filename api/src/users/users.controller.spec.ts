/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { DataServiceMock, userMock } from '../../test/mocks';

describe('Users Controller', () => {
  const mock = userMock;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [DataServiceMock],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a user by id', async () => {
    const result = await controller.getUserById(mock.id);
    expect(result).toEqual(mock);
  });

  it('should find a user by email', async () => {
    const result = await controller.getUserById(mock.email);
    expect(result).toEqual(mock);
  });

  it('should create a user', async () => {
    const { id, ...user } = mock;
    const result = await controller.createUser(user);
    expect(result).toBeDefined();
    expect(result.id).not.toEqual(mock.id);
  });

  it('should update a user', async () => {
    const { ...user } = mock;
    user.email = 'another@test.com';
    const result = await controller.updateUserById(user);
    expect(result.id).toEqual(mock.id);
    expect(result.email).not.toEqual(mock.email);
  });
});
