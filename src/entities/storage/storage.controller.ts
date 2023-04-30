import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/guards/auth.guard';
import { CsrfGuard } from 'src/guards/csrf.guard';
import { Throttle } from 'src/decorators/throttle.decorator';

import { StorageItem } from 'src/schemas/storage.schema';
import { StorageService } from './storage.service';

@Controller('storage')
@UseGuards(CsrfGuard, AuthGuard)
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Get()
  @Throttle(1000)
  public async handleGetFiles(): Promise<StorageItem[]> {
    return this.storageService.getFiles();
  }

  @Get('images')
  public async handleGetImages(): Promise<StorageItem[]> {
    return this.storageService.getImages();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async handleFileUpload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('File is not uploaded');
    }

    return this.storageService.saveFile(file);
  }

  @Delete(':id')
  public async handleFileDelete(@Param('id') id: string): Promise<void> {
    const file = await this.storageService.getFileById(id);

    if (!file) {
      throw new BadRequestException('File not found');
    }

    return this.storageService.deleteFile(file);
  }
}
