import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'
import { CorsOptions } from '@nestjs/common/internal';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.use(cookieParser());
  app.enableCors(corsOptions)

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
