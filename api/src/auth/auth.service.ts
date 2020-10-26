import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IGeneralObj } from '@/core/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Login User
   * Creates a JWT from the provided User object
   *
   * @param {Object} user
   *
   * @returns {Promise<IGeneralObj>}
   */
  async login(user: {id: string, email: string, [key: string]: any}): Promise<IGeneralObj> {
    return {
      token: this.jwt.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
