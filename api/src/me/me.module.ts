import { Module } from '@nestjs/common';

import { MeController } from './me.controller';
import { MeService } from './me.service';

import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
