import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { JwtGuard, LocalGuard } from '@/core/guards';
import { IGeneralObj } from '@/core/types';
import { validateRoleAccess } from '@/core/helpers';

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
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req: IGeneralObj): Promise<IGeneralObj> {
    return this.auth.login(req.user);
  }

  /**
   * Role Check
   *
   * @route /api/v1/auth/role/:role
   *
   * @param {string} role
   *
   * @returns {boolean}
   */
  @UseGuards(JwtGuard)
  @Get('role/:role')
  async roleCheck(
    @Request() req: IGeneralObj,
    @Param('role') role: string,
  ): Promise<any> {
    const hasAccess = validateRoleAccess(req.user?.role, role);
    return { status: hasAccess };
  }
}
