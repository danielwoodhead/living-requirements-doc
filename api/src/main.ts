import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpServer = app.getHttpAdapter().getInstance();
  httpServer.disable('x-powered-by');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
