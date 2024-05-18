import { Injectable, OnModuleInit, Provider } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SeedMethodologiesService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const methodologies = [
      { name: 'vuejs' },
      { name: 'react' },
      { name: 'java' },
      { name: 'php' },
      { name: 'rabbitmq' },
      { name: 'docker' },
      { name: 'html' },
      { name: 'rust' },
      { name: 'nestjs' },
      { name: 'mysql' },
      { name: 'python' },
      { name: 'angular' },
      { name: '.net' },
      { name: 'c++' },
      { name: 'c' },
      { name: 'c#' },
      { name: 'ruby' },
      { name: 'css' },
    ];

    for (const methodology of methodologies) {
      const exists = await this.prisma.methodologie.findFirst({
        where: {
          name: {
            equals: methodology.name,
          },
        },
      });

      if (!exists) {
        await this.prisma.methodologie.create({
          data: methodology,
        });
      }
    }
  }
}
