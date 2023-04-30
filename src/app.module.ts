import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { SkillsModule } from './entities/skills/skills.module';
import { TelegramModule } from './entities/telegram/telegram.module';
import { UsersModule } from './entities/users/users.module';
import { AppController } from './app.controller';
import { JourneyModule } from './entities/journey/journey.module';
import { StorageModule } from './entities/storage/storage.module';

import { getPublicPath } from './utils';
import { CertificatesModule } from './entities/certificates/certificates.module';
import { CvModule } from './entities/cv/cv.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({}),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const [user, pass, host, port, dbName] = [
          configService.get<string>('MONGO_USER'),
          configService.get<string>('MONGO_PASSWORD'),
          configService.get<string>('MONGO_HOST'),
          configService.get<number>('MONGO_PORT'),
          configService.get<string>('MONGO_DB_NAME'),
        ];

        return {
          uri: `mongodb://${user}:${pass}@${host}:${port}/${dbName}`,
        };
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: getPublicPath(),
      exclude: ['/api/(.*)'],
    }),

    SkillsModule,
    TelegramModule,
    UsersModule,
    JourneyModule,
    StorageModule,
    CertificatesModule,
    CvModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
