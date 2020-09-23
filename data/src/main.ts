import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const host = process.env.DATA_HOST || '0.0.0.0';
const port = +process.env.DATA_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  });
  app.listen(() => {
    Logger.log(`Data Service is running on ${host}:${port}`);
  });
}
bootstrap();
