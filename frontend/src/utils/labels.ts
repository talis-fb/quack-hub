import type { StateExperience } from '@/entites/IExperience'
import type { StateProject } from '@/entites/IProject'
import type { StateVacancy } from '@/entites/IVacancy'

export const experienceStateLabel: Record<StateExperience, string> = {
  PAUSED: 'Pausado',
  CANCELLED: 'Cancelado',
  COMPLETED: 'Finalizado',
  PROGRESS: 'Em andamento'
}

export const projectStateLabel: Record<StateProject, string> = {
  PAUSED: 'Pausado',
  CANCELLED: 'Cancelado',
  COMPLETED: 'Finalizado',
  PROGRESS: 'Em andamento'
}

export const vacancyLabelState: Record<StateVacancy, String> = {
  PAUSED: 'Pausado',
  PROGRESS: 'Em andamento',
  CLOSED: 'Fechado'
}
