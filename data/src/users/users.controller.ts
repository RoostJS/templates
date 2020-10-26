import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Core
import { CrudFactory, MessageFactory } from '@/core/factories';
import { IGeneral, IMessages } from '@/core/types';
import { StringService } from '@/core/services';

// Entity
import { User } from './user.entity';

const CrudController: any = CrudFactory('user');
const messages: IMessages = MessageFactory('user');

@Controller('users')
export class UsersController extends CrudController {
  constructor(
    @InjectRepository(User) readonly repo: Repository<User>,
    private readonly string: StringService,
  ) {
    super(repo);
  }

  /**
   * Get One By key - Override
   *
   * @param {IGeneral} filter
   *
   * @return {Promise<any>}
   */
  @MessagePattern(messages.findOneBy)
  async findOneBy(filter: IGeneral): Promise<any> {
    if (filter.password) {
      filter.password = await this.string.hash(filter.password);
    }
    return super.findOneBy(filter);
  }
}
