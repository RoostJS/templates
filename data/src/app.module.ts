import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { SeedModule } from './seed/seed.module';

import { CoreModule } from './core/core.module';
import { DbService } from './core/services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbService,
    }),
    CoreModule,
    UsersModule,
    AccountsModule,
    SeedModule,
  ],
})
export class AppModule {}
