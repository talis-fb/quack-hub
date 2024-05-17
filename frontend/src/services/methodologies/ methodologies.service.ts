import type { IMethodologiesApi } from '@/apis/methodologies/methodologies.api'
import type { IMethodologieEntity } from '@/entites/IMethodologie'

export interface IMethodologiesService {
  findAll(): Promise<IMethodologieEntity[]>
}

export class MethodologiesServiceImpl implements IMethodologiesService {
  constructor(private readonly methodologiesApi: IMethodologiesApi) {}

  async findAll(): Promise<IMethodologieEntity[]> {
    const res = await this.methodologiesApi.findAll()

    return res
  }
}
