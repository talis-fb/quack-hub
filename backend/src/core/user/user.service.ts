
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async get(id: number): Promise<any> {
    // TODO:
    // Remove this query from here and pass to a repository

    const r = await this.prisma.user.findUnique({
        where: {
            id
        }
    });
    console.log(r);
    return r;
  }
}
