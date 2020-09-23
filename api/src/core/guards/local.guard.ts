import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LocalStrategy } from '@/core/strategies';
import { IUser } from '@/core/types';

@Injectable()
export class LocalGuard implements CanActivate {
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
