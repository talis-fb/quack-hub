import { z } from 'zod'
import { MethodologieEntity } from './IMethodologie'

export const StateProjectValues = ['PAUSED', 'PROGRESS', 'COMPLETED', 'CANCELLED'] as const

export type StateProject = (typeof StateProjectValues)[number]

export const ProjectData = z.object({
  title: z.string(),
  summary: z.string(),
  about: z.string(),
  sector: z.string(),
  state: z.enum(StateProjectValues),
  startDate: z.string(),
  endDate: z.string().nullable().transform((val) => (val ? new Date(val) : null)),
  logoUrl: z.string().nullable().transform((val) => (val ? new Date(val) : null)),
})
export type IProjectData = z.infer<typeof ProjectData>

export const ProjectEntity = ProjectData.extend({
  id: z.number(),
  userId: z.number(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val))
})
export type IProjectEntity = z.infer<typeof ProjectEntity>


export const InputProjectData = ProjectData.extend({
  methodologies: z.array(MethodologieEntity)
})
export type IInputProjectData = z.infer<typeof InputProjectData>


