import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'shhhhhhhhhh0123456789!@#$%^&*()_+',
    });
  }

  async validate(payload) {
    const user = {
      userId: payload.userId,
      email: payload.email,
    };
    return user;
  }
}
