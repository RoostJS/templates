import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryService } from '../core/utils/query.service';
import { UsersController } from './users.controller';
import { User } from '../core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [QueryService],
})
export class UsersModule {}
