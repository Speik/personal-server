import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CsrfService } from './csrf.service';

@Module({
  providers: [CsrfService],
  exports: [CsrfService],
  imports: [ConfigModule],
})
export class CsrfModule {}
