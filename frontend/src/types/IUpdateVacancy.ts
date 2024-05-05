import type { StateVacancy } from '@/entites/IVacancy'

export interface IUpdateVacancy {
  title: string
  description: string
  state: StateVacancy
}
