import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { Cv, CvSchema } from 'src/schemas/cv.schema';

@Module({
  controllers: [CvController],
  providers: [CvService],
  imports: [
    MongooseModule.forFeature([{ name: Cv.name, schema: CvSchema }]),
    ConfigModule,
    JwtModule,
  ],
})
export class CvModule {}
