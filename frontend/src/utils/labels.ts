import type { StateProject } from '@/entites/IProject'
import type { StateVacancy } from '@/entites/IVacancy'

export const projectStateLabel: Record<StateProject, string> = {
  PAUSED: 'Pausado',
  CANCELLED: 'Cancelado',
  COMPLETED: 'Finalizado',
  PROGRESS: 'Em progresso'
}


export const vacancyLabelState: Record<StateVacancy, String> = {
  PAUSED: 'Pausado',
  PROGRESS: 'Em andamento',
  CLOSED: 'Fechado'
}
