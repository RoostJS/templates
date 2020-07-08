import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../core/entities/user.entity';
import Messages from './messages';
import Crud from '../core/utils/crud.controller';

const CrudController: any = Crud(Messages);

@Controller('users')
export class UsersController extends CrudController {
  constructor(@InjectRepository(User) readonly repo: Repository<User>) {
    super(repo);
  }
}
