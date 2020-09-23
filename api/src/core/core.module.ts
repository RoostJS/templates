import { Module } from '@nestjs/common';
import { LocalStrategy, JwtStrategy } from './strategies';
import { ConnectorService, DataService, StringService } from './services';

@Module({
  providers: [
    ConnectorService,
    DataService,
    StringService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    ConnectorService,
    DataService,
    StringService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class CoreModule {}
