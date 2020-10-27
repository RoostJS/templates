import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LocalStrategy } from '@/core/strategies';

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
    const user = await this.strategy.validate(email, password);
    if (!user) {
      return false;
    }

    // If authed set user in Request
    request.user = user;
    return true;
  }
}
