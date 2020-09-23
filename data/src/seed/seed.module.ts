import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';

import { CoreModule } from '@/core/core.module';
import { Account, User } from '@/core/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User]), CoreModule],
  providers: [SeedService],
})
export class SeedModule {}
