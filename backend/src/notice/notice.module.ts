import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeServiceProvider } from './notice.service';
import { HttpModule } from '@nestjs/axios';
import { NoticeRepositoryProvider } from './notice.repository';

@Module({
  imports: [HttpModule],
  controllers: [NoticeController],
  providers: [NoticeServiceProvider, NoticeRepositoryProvider],
})
export class NoticeModule {}
