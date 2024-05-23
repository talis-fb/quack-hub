import { z } from 'zod'

export const StateVacancyValues = ['PAUSED', 'CLOSED', 'PROGRESS'] as const

export type StateVacancy = (typeof StateVacancyValues)[number]

export const VacancyData = z.object({
  title: z.string(),
  description: z.string(),
  requirements: z.array(z.string()),
  state: z.enum(StateVacancyValues),
  projectId: z.number()
})
export type IVacancyData = z.infer<typeof VacancyData>

export const VacancyEntity = VacancyData.extend({
  id: z.number(),
  createdAt: z.string().transform((value) => new Date(value)),
  updatedAt: z.string().transform((value) => new Date(value))
})
export type IVacancyEntity = z.infer<typeof VacancyEntity>
