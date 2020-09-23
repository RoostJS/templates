/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { DataServiceMock, accountMock } from '~/mocks';

describe('Accounts Controller', () => {
  const mock = accountMock;
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [DataServiceMock],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find an account by id', async () => {
    const result = await controller.getAccountById(mock.id);
    expect(result).toEqual(mock);
  });

  it('should create a new account', async () => {
    const { id, ...account } = mock;
    const result = await controller.createAccount(account);
    expect(result).toBeDefined();
    expect(result.id).not.toEqual(mock.id);
  });

  it('should update an account', async () => {
    const { ...account } = mock;
    account.name = 'New Name';
    const result = await controller.updateAccountById(account.id, account);
    expect(result.id).toEqual(mock.id);
    expect(result.name).not.toEqual(mock.name);
  });
});
