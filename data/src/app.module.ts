import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './core/clients/db.service';
import { QueryService } from './core/utils/query.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbService,
    }),
    UsersModule,
    AccountsModule,
  ],
  providers: [QueryService],
})
export class AppModule {}
