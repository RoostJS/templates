import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryService } from '../core/utils/query.service';
import { AccountsController } from './accounts.controller';
import { Account } from '../core/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [QueryService],
})
export class AccountsModule {}
