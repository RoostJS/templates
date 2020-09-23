import { Module } from '@nestjs/common';
import { DbService, QueryService, StringService } from '@/core/services';

@Module({
  providers: [DbService, QueryService, StringService],
  exports: [DbService, QueryService, StringService],
})
export class CoreModule {}
