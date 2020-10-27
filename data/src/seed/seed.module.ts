import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Core
import { CoreModule } from '@/core/core.module';
import { Account } from '@/accounts/account.entity';
import { User } from '@/users/user.entity';

import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User]), CoreModule],
  providers: [SeedService],
})
export class SeedModule {}
