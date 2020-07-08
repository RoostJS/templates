import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../core/entities';
import Messages from './messages';
import Crud from '../core/utils/crud.controller';

const CrudController: any = Crud(Messages);

@Controller('accounts')
export class AccountsController extends CrudController {
  constructor(@InjectRepository(Account) readonly repo: Repository<Account>) {
    super(repo);
  }
}
