import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { NoticeService } from './notice.service';

@Public()
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  async getNotice() {
    const output = await this.noticeService.getNotice();

    return output;
  }
}
