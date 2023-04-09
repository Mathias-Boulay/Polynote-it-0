import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { COOKIE_SECRET } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { abortOnError: false },
  );

  await app.register(fastifyCookie, {
    secret: COOKIE_SECRET, // for cookies signature
  });

  app.useGlobalPipes(new ValidationPipe());
  // FIXME use a specific origin !
  app.enableCors({ origin: true, credentials: true });
  await app.listen(3333, '0.0.0.0');
}
bootstrap();
