import { jwtDecode } from 'jwt-decode'

export interface Decoded {
  email: string
  iat: number
  sub: number
  exp: number
}

export interface IJwtService {
  decode(token: string): any
}

export class JwtServiceImpl implements IJwtService {
  decode(token: string): any {
    return jwtDecode(token)
  }
}
