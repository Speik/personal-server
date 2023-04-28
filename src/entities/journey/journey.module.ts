import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JourneyController } from './journey.controller';
import { JourneyService } from './journey.service';
import { Journey, JourneySchema } from 'src/schemas/journey.schema';

@Module({
  controllers: [JourneyController],
  providers: [JourneyService],
  imports: [
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
    ConfigModule,
    JwtModule,
  ],
})
export class JourneyModule {}
