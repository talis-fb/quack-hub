import type { StateProject } from '@/entites/IProject'
import type { StateVacancy } from '@/entites/IVacancy'

export const projectStateLabel: Record<StateProject, string> = {
  IDLE: 'Iniciado',
  CANCELLED: 'Cancelado',
  COMPLETED: 'Finalizado',
  PROGRESS: 'Em progresso'
}

export const vacancyLabelState: Record<StateVacancy, String> = {
  OPEN: 'Aberto',
  IN_SELECTION_PROCESS: 'Em andamento',
  CLOSED: 'Fechado'
}
