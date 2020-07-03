import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { IGeneralObj, IUser } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  /**
   * Login Endpoint
   *
   * @route /api/v1/auth/login
   *
   * @param {string} username
   * @param {string} password
   *
   * @returns {IUser}
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<IGeneralObj> {
    return this.auth.login(req.user);
  }

  /**
   * My use details
   *
   * @route /api/v1/auth/me
   *
   * @returns {Partial<IUser>}
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: any): Promise<Partial<IUser>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...user } = req.user;
    return user;
  }
}
