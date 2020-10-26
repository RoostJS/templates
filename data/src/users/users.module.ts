import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Core
import { CoreModule } from '@/core/core.module';

import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CoreModule],
  controllers: [UsersController],
})
export class UsersModule {}
