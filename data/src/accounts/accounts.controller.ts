import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '@/core/entities';
import { CrudFactory } from '@/core/factories';

const CrudController = CrudFactory('account');

@Controller('accounts')
export class AccountsController extends CrudController {
  constructor(@InjectRepository(Account) readonly repo: Repository<Account>) {
    super(repo);
  }
}
