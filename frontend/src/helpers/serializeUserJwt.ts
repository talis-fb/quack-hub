import type { JwtDecoded } from '@/services/jwt/jwt.service'
import type { UserState } from '@/stores/auth'

export const serializeUserJwt = (userJwt: JwtDecoded): UserState => {
  const user = {
    id: userJwt.sub,
    email: userJwt.email
  }

  return user
}
