import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '@/users/users.module';

import { CoreModule } from '@/core/core.module';
import { jwtConstants } from '@/core/constants';
import { HashMiddleware } from '@/core/middleware';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HashMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
