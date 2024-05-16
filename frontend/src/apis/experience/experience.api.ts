import type { IExperienceData, IExperienceEntity } from '@/entites/IExperience'

import { type ExperienceType } from '@/entites/IExperience'
import { api } from '@/network/api'

export interface IExperienceApi {
  delete(experienceId: number): Promise<IExperienceEntity>
  update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: IExperienceData): Promise<IExperienceEntity>
}

export class ExperienceApiImpl implements IExperienceApi {
  async delete(experienceId: number): Promise<IExperienceEntity> {
    const res = await api.delete<IExperienceEntity>(`/experience/${experienceId}`)

    return res.data
  }

  async update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity> {
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

  async create(data: IExperienceData): Promise<IExperienceEntity> {
    const res = await api.post<IExperienceEntity>('/experience', data)

    return res.data
  }
}
