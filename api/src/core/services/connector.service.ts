import { Injectable } from '@nestjs/common';
import {
  Transport,
  ClientProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class ConnectorService {
  public readonly data: ClientProxy;

  constructor() {
    this.data = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.DATA_HOST,
        port: +process.env.DATA_PORT,
      },
    });
  }
}
