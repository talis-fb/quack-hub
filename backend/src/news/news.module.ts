import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceProvider } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsServiceProvider],
})
export class NewsModule {}
