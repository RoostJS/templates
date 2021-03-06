import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { validateRoleAccess } from '@/core/helpers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * canActivate override
   *
   * @todo Extract Super Override logic for better testing
   *
   * @param {ExecutionContext} context
   *
   * @returns {boolean}
   */
  canActivate(context: ExecutionContext): boolean {
    // Get access roles from either Class or Method decorator
    // Method specific decorator overrides Class decorator
    const accessRole = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    // Do not protect if no accessRole was found
    if (!accessRole) return true;

    const request = context.switchToHttp().getRequest();

    // Get user object from Request
    // Set by LocalStrategy or JwtStrategy
    const { user } = request;
    if (!user) return false;

    // Validate that user has access
    return validateRoleAccess(user.role, accessRole);
  }
}
