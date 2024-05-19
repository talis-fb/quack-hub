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
      // Frontend technologies
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'Javascript' },
      { name: 'Typescript' },

      // Libs and Frameworks Frontend
      { name: 'React' },
      { name: 'Vue' },
      { name: 'Angular' },
      { name: 'Svelte' },

      // Libs and Frameworks CSS
      { name: 'Tailwind CSS' },
      { name: 'Materialize' },
      { name: 'Bootstrap' },
      { name: 'Sass' },
      { name: 'LESS' },

      // Backend technologies
      { name: 'Java' },
      { name: 'Python' },
      { name: 'C++' },
      { name: 'C' },
      { name: 'C#' },
      { name: 'Node.JS' },
      { name: 'PHP' },
      { name: 'Rust' },
      { name: 'Ruby' },

      // BACKEND Frameworks
      { name: 'Laravel' },
      { name: 'NestJS' },
      { name: 'Spring' },
      { name: 'Django' },
      { name: 'ASP.NET' },
      { name: '.NET' },

      // Infastructure technologies
      { name: 'RabbitMQ' },
      { name: 'Kafka' },
      { name: 'Docker' },
      { name: 'Nginx' },

      // BD technologies
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'SQL Server' },
      { name: 'MongoDB' },
      { name: 'Redis' },
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
