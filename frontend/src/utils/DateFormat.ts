import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateInFull(date: Date | number) {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}
