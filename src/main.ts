import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AppModule } from './app.module';

import { AuthGuard } from './guards/auth.guard';
import { CsrfGuard } from './guards/csrf.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  const csrfGuard = new CsrfGuard(configService, reflector);
  const authGuard = new AuthGuard(jwtService, configService, reflector);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(csrfGuard, authGuard);
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    exposedHeaders: 'Content-Disposition',
    origin: [/http:\/\/192.168.1.9:420[0-9]/],
  });

  const appPort = configService.get<string>('APP_PORT');
  await app.listen(appPort);
}

bootstrap();
