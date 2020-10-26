import { Module } from '@nestjs/common';

// Core
import { CoreModule } from '@/core/core.module';

import { MeController } from './me.controller';

@Module({
  imports: [CoreModule],
  controllers: [MeController],
})
export class MeModule {}
