import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { DataService } from '../core/utils';
import ConnectorService from '../core/services/connector.service';

@Module({
  controllers: [AccountsController],
  providers: [ConnectorService, DataService],
})
export class AccountsModule {}
