import { Module } from '@nestjs/common';

// Core
import { ConnectorService } from './core/services';

// Service
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule, MeModule],
  providers: [ConnectorService],
})
export class AppModule {}
