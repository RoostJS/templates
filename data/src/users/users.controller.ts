import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/core/entities';
import { CrudFactory } from '@/core/factories';

const CrudController: any = CrudFactory('user');

@Controller('users')
export class UsersController extends CrudController {
  constructor(@InjectRepository(User) readonly repo: Repository<User>) {
    super(repo);
  }
}
