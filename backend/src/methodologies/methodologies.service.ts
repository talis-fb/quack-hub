import { Injectable, Provider } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/collection/ResourceNotFound.exception';
import {
  MethodologieData,
  MethodologieEntity,
} from 'src/methodologies/methodologie.entity';
import { MethodologiesRepository } from 'src/methodologies/methodologies.repository';

export abstract class MethodologiesService {
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
export class MethodologiesServiceImpl implements MethodologiesService {
  constructor(
    private readonly methodologiesRepository: MethodologiesRepository,
  ) {}

  public async findMany(): Promise<MethodologieEntity[]> {
    const output = await this.methodologiesRepository.findMany();

    return output;
  }

  public async findById(id: number): Promise<MethodologieEntity> {
    const output = await this.methodologiesRepository.findById(id);

    if (!output) {
      throw new NotFoundException();
    }

    return output;
  }

  public async create(data: MethodologieData): Promise<MethodologieEntity> {
    const output = await this.methodologiesRepository.create(data);

    return output;
  }

  public async update(
    id: number,
    data: MethodologieData,
  ): Promise<MethodologieEntity> {
    const methodologieToUpdate = await this.findById(id);

    if (!methodologieToUpdate) {
      throw new NotFoundException();
    }

    const output = await this.methodologiesRepository.update(id, data);

    return output;
  }

  public async delete(id: number): Promise<MethodologieEntity> {
    const methodologieToUpdate = await this.findById(id);

    if (!methodologieToUpdate) {
      throw new NotFoundException();
    }

    const output = await this.methodologiesRepository.delete(id);

    return output;
  }
}

export const MethodologiesServiceProvider: Provider = {
  provide: MethodologiesService,
  useClass: MethodologiesServiceImpl,
};
