import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpServer = app.getHttpAdapter().getInstance();
  httpServer.disable('x-powered-by');
  httpServer.disable('x-ratelimit-limit');
  httpServer.disable('x-ratelimit-remaining');
  httpServer.disable('x-ratelimit-reset');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
