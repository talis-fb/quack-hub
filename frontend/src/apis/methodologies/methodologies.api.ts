import type { IMethodologieEntity } from '@/entites/IMethodologie'
import { api } from '@/network/api'

export interface IMethodologiesApi {
  findAll(): Promise<IMethodologieEntity[]>
}

export class MethodologiesApiImpl implements IMethodologiesApi {
  async findAll(): Promise<IMethodologieEntity[]> {
    const res = await api.get<IMethodologieEntity[]>('/methodologies')

    return res.data
  }
}
