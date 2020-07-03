import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DataService } from '../core/utils';
import ConnectorService from '../core/services/connector.service';

@Module({
  controllers: [UsersController],
  providers: [ConnectorService, DataService],
})
export class UsersModule {}
