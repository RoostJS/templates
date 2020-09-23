import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ConnectorService } from './core/services';
import { MeModule } from './me/me.module';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule, MeModule],
  providers: [ConnectorService],
})
export class AppModule {}
