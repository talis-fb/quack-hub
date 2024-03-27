import { HttpError } from '@/exceptions/http-error'

export function responseErrorHandler(error: any) {
  if (error.response) {
    const { data } = error.response
    throw new HttpError(data.message || 'Erro de resposta do servidor')
  } else if (error.request) {
    throw new HttpError('Sem resposta do servidor')
  } else {
    throw new HttpError('Erro ao configurar a requisição')
  }
}
