import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract the jwt from the cookie
      jwtFromRequest: (req) => {
        let jwt = null;

        if (req && req.cookies) {
          jwt = req.cookies['jwt'];
        }

        return jwt;
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // Passport handles authenticating the payload
    return payload;
  }
}
