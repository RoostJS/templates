import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGeneralObj, IUser } from '../types';
import { DataService } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly data: DataService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Validate User
   *
   * @param {string} email
   * @param {string} pass
   *
   * @returns {Promise<Partial<IUser>> | null}
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<IUser>> | null {
    const user = await this.data.use('user').findOne({ email });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

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
      token: this.jwt.sign(user),
    };
  }
}
