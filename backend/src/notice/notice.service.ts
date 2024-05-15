import { Injectable, Provider } from '@nestjs/common';
import { NoticeEntity } from './notice.entity';
import { NoticeRepository } from './notice.repository';

export abstract class NoticeService {
  abstract getNotice(): Promise<NoticeEntity[]>;
}

@Injectable()
export class NoticeServiceImpl implements NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}


  async getNotice(): Promise<NoticeEntity[]> {
    const output = await this.noticeRepository.getNotices();
    return output;
  }
}

export const NoticeServiceProvider: Provider = {
  provide: NoticeService,
  useClass: NoticeServiceImpl,
};
