import type { IExperienceEntity } from '@/entites/IExperience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'

import { type ExperienceType } from '@/entites/IExperience'
import { api } from '@/network/api'
import type { IUpdateExperinece } from '@/apis/experience/types/IUpdateExperinece'

export interface IExperienceApi {
  update(experienceId: number, data: IUpdateExperinece): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceApiImpl implements IExperienceApi {
  async update(experienceId: number, data: IUpdateExperinece): Promise<IExperienceEntity> {
    const res = await api.put<IExperienceEntity>(`/experience/${experienceId}`, data)

    return res.data
  }

  async getExperiencesByUserId(
    userId: number,
    type?: ExperienceType
  ): Promise<IExperienceEntity[]> {
    const res = await api.get<IExperienceEntity[]>(`/experience/user/${userId}`, {
      params: {
        type
      }
    })

    return res.data
  }

  async create(data: ICreateExperience): Promise<IExperienceEntity> {
    const res = await api.post<IExperienceEntity>('/experience', data)

    return res.data
  }
}
