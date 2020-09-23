import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IGeneralObj, IUser } from '@/core/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Login User
   * Creates a JWT from the provided User object
   *
   * @param {Partial<IUser>} user
   *
   * @returns {Promise<IGeneralObj>}
   */
  async login(user: Partial<IUser>): Promise<IGeneralObj> {
    return {
      token: this.jwt.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
