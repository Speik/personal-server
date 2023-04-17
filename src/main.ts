import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const appPort = configService.get<string>('APP_PORT');

  app.useGlobalGuards(new AuthGuard(configService));
  await app.listen(appPort);
}

bootstrap();
