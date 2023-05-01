import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { Guest, GuestSchema } from 'src/schemas/guest.schema';

@Module({
  controllers: [GuestController],
  providers: [GuestService],
  imports: [
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
    ConfigModule,
    JwtModule,
  ],
})
export class GuestModule {}
