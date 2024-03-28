import axios from 'axios'
import { baseURL } from './config'

import { responseErrorHandler } from '@/helpers/response-error-handler'
import { storageService } from '@/services'

export const api = axios.create({
  baseURL
})

api.interceptors.request.use(
  (config) => {
    const token = storageService.getItem('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use((response) => response, responseErrorHandler)
