import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ContextFactory } from 'src/factory/factories/context.factory';
import { IMDFactory } from 'src/factory/factories/imd.factory';
import { USPFactory } from 'src/factory/factories/usp.factory';
import { ECTFactory } from 'src/factory/factories/ect.factory';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ContextFactory,
      useFactory: (httpService: HttpService) => {
        if (process.env.CONTEXT === 'USP') {
          return new USPFactory(httpService);
        } else if (process.env.CONTEXT === 'ECT') {
          return new ECTFactory(httpService);
        }

        return new IMDFactory(httpService);
      },
      inject: [HttpService],
    },
  ],
  exports: [ContextFactory],
})
export class FactoryModule {}
