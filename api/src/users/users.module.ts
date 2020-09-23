import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UsersController } from './users.controller';

import { CoreModule } from '@/core/core.module';
import { HashMiddleware } from '@/core/middleware';

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HashMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/*', method: RequestMethod.POST },
      );
  }
}
