import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { IUser } from '../types';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly strategy: LocalStrategy) {}

  /**
   * canActivate override
   *
   * @param {ExecutionContext} context
   *
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    const user: Partial<IUser> = await this.strategy.validate(email, password);
    if (!user) {
      return false;
    }

    // If authed set user in Request
    request.user = user;
    return true;
  }
}
