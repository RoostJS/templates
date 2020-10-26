import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IGeneralObj } from '@/core/types';
import { DataService } from '@/core/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private data: DataService) {
    super({ usernameField: 'email' }); // See hint at https://docs.nestjs.com/techniques/authentication#implementing-passport-local
  }

  /**
   * Validate provided credentials
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<IGeneralObj>}
   */
  async validate(email: string, password: string): Promise<IGeneralObj> {
    const user = await this.data.use('user').findOneBy({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pass, ...valid } = user;
    return valid;
  }
}
