import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(helmet());
  // Rate limit requests to 100 per 1 minutes
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
    }),
  );
  await app.listen(+process.env.API_PORT);
}
bootstrap();
