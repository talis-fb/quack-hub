import { Injectable, Provider } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  MethodologieData,
  MethodologieEntity,
} from 'src/core/methodologies/methodologie.entity';

export abstract class MethodologiesRepository {
  public abstract findMany(): Promise<MethodologieEntity[]>;
  public abstract findById(id: number): Promise<MethodologieEntity>;
  public abstract create(data: MethodologieData): Promise<MethodologieEntity>;
  public abstract update(
    id: number,
    data: MethodologieData,
  ): Promise<MethodologieEntity>;
  public abstract delete(id: number): Promise<MethodologieEntity>;
}

@Injectable()
export class MethodologiesRepositoryImpl implements MethodologiesRepository {
  constructor(private prisma: PrismaService) {}

  public async findMany(): Promise<MethodologieEntity[]> {
    const output = await this.prisma.methodologie.findMany({});

    return output;
  }

  public async findById(id: number): Promise<MethodologieEntity> {
    const output = await this.prisma.methodologie.findUnique({
      where: {
        id,
      },
    });

    return output;
  }

  public async create(data: MethodologieData): Promise<MethodologieEntity> {
    const output = await this.prisma.methodologie.create({
      data,
    });

    return output;
  }

  public async update(
    id: number,
    data: MethodologieData,
  ): Promise<MethodologieEntity> {
    const output = await this.prisma.methodologie.update({
      where: {
        id,
      },
      data,
    });

    return output;
  }

  public async delete(id: number): Promise<MethodologieEntity> {
    const output = await this.prisma.methodologie.delete({
      where: {
        id,
      },
    });

    return output;
  }
}

export const MethodologiesRepositoryProvider: Provider = {
  provide: MethodologiesRepository,
  useClass: MethodologiesRepositoryImpl,
};
