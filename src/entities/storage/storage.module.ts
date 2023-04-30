import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { join } from 'path';
import { diskStorage } from 'multer';

import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { StorageItem, StorageItemSchema } from 'src/schemas/storage.schema';

import { getPublicPath, generateFilename } from 'src/utils';

@Module({
  providers: [StorageService],
  controllers: [StorageController],
  imports: [
    MongooseModule.forFeature([
      { name: StorageItem.name, schema: StorageItemSchema },
    ]),

    MulterModule.register({
      storage: diskStorage({
        destination: join(getPublicPath(), 'storage'),
        filename: generateFilename,
      }),
    }),

    ConfigModule,
    JwtModule,
  ],
})
export class StorageModule {}
