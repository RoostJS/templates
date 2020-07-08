import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../core/entities';

describe('Accounts Controller', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Account),
          useClass: Repository,
        },
      ],
      controllers: [AccountsController],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
