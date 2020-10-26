import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Core
import { CrudFactory } from '@/core/factories';

// Entity
import { Account } from './account.entity';

const CrudController = CrudFactory('account');

@Controller('accounts')
export class AccountsController extends CrudController {
  constructor(@InjectRepository(Account) readonly repo: Repository<Account>) {
    super(repo);
  }
}
