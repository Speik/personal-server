import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsModule } from './entities/skills/skills.module';
import { TelegramModule } from './entities/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
