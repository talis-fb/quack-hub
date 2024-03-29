import { HttpException } from '@/exceptions/HttpException'

export function responseErrorHandler(error: any) {
  if (error.response) {
    const { data } = error.response
    throw new HttpException(data.message || 'Erro de resposta do servidor')
  } else if (error.request) {
    throw new HttpException('Sem resposta do servidor')
  } else {
    throw new HttpException('Erro ao configurar a requisição')
  }
}
