import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { join } from 'path';

import { SkillsModule } from './entities/skills/skills.module';
import { TelegramModule } from './entities/telegram/telegram.module';
import { UsersModule } from './entities/users/users.module';
import { AppController } from './app.controller';
import { JourneyModule } from './entities/journey/journey.module';

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

    SkillsModule,
    TelegramModule,
    UsersModule,
    JourneyModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
