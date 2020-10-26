import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UsersController } from './users.controller';

import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {}
