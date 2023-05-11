import * as cookieParser from 'cookie-parser';

import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AppModule } from './app.module';

import { AuthGuard } from './guards/auth.guard';
import { CsrfGuard } from './guards/csrf.guard';
import { CsrfService } from './entities/csrf/csrf.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const csrfService = app.get(CsrfService);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  const csrfGuard = new CsrfGuard(reflector, csrfService);
  const authGuard = new AuthGuard(jwtService, configService, reflector);
  const appPort = configService.get<string>('APP_PORT');

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(csrfGuard, authGuard);
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    exposedHeaders: ['Content-Disposition', 'Set-Cookie'],
    origin: [
      'http://192.168.1.9:4201',
      'http://192.168.1.9:4200',
      `http://192.168.1.9:${appPort}`,
    ],
    credentials: true,
    allowedHeaders: [
      'Authorization',
      'Set-Cookie',
      'Content-Type',
      'x-csrf-token',
    ],
  });

  await app.listen(appPort, '192.168.1.9');
}

bootstrap();
