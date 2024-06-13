import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { STATIC_METHODOLOGIESIMD } from 'src/core/methodologies/methodologies-moc/STARTUP_VALUES_IMD';

@Injectable()
export class MethodologieStartup implements OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}

  async onApplicationBootstrap() {
    for (const methodology of STATIC_METHODOLOGIESIMD) {
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
