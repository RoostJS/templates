import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
