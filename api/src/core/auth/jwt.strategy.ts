import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { IGeneralObj } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validate JWT
   *
   * @param {IGeneralObj} payload
   *
   * @returns {Promise<IGeneralObj>}
   */
  async validate(payload: IGeneralObj): Promise<IGeneralObj> {
    return payload;
  }
}
