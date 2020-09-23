import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsController } from './accounts.controller';

import { Account } from '@/core/entities';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), CoreModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
