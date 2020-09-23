/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '@/core/constants';
import { IGeneralObj, IUser } from '@/core/types';
import { DataService } from '@/core/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly data: DataService) {
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
  async validate(payload: IGeneralObj): Promise<Partial<IUser>> {
    try {
      const user = await this.data.use('user').findOne(payload.id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const { password, ...res } = user;
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
