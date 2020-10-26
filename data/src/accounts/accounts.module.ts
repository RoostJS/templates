import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Core
import { CoreModule } from '@/core/core.module';

import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), CoreModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
