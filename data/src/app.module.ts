import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Core
import { CoreModule } from './core/core.module';
import { DbService } from './core/services';

// Service
import { AccountsModule } from './accounts/accounts.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbService,
    }),
    AccountsModule,
    CoreModule,
    SeedModule,
    UsersModule,
  ],
})
export class AppModule {}
