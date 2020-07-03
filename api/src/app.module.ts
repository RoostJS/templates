import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './core/auth/auth.module';
import ConnectorService from './core/services/connector.service';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule],
  providers: [ConnectorService],
})
export class AppModule {}
