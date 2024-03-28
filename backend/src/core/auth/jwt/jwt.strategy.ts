import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  // Make the validation of input JWT in header request
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
