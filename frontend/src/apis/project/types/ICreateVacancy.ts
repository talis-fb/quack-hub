import type { StateVacancy } from '@/entites/IVacancy'

export interface ICreateVacancy {
  title: string
  description: string
  state: StateVacancy
  projectId: number;
}
