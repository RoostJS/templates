# API Local Authentication

**Generate a [JSON Web Token](JsonWebTokens.md) from the provided `email` and `password`**

_See the [NestJS Documentation](https://docs.nestjs.com/techniques/authentication#implementing-passport-local) for more details_

**Note: the following are shortened examples**

## Local Guard

```ts
// src/core/guards/local.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LocalStrategy } from '../strategies';
import { IUser } from '../types';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly strategy: LocalStrategy) {}

  /**
   * CanActivate::canActivate required method
   *
   * @param {ExecutionContext} context
   *
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the ExpressJS Request object
    const request = context.switchToHttp().getRequest();

    // Extract data from the request body
    const { email, password } = request.body;

    // Validate using a strategy
    // Validation returns a Partial<> User because it removes the password property
    // No need in having sensitive data being passed around
    const user: Partial<IUser> = await this.strategy.validate(email, password);

    if (!user) {
      return false;
    }

    // If authed, set the user property in Request object
    // This is now usable by controllers
    request.user = user;
    return true;
  }
}
```

## Local Strategy

```ts
// src/core/strategies/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from '@/core/types';
import { DataService } from '@/core/utils/data.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly data: DataService) {
    super({ usernameField: 'email' }); // See hint at https://docs.nestjs.com/techniques/authentication#implementing-passport-local
  }

  /**
   * Validate provided credentials
   * PassportStrategy::validate override
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<Partial<IUser>>}
   */
  async validate(email: string, password: string): Promise<Partial<IUser>> {
    // Find a user in the database
    const user = await this.data.use('user').findOneBy({ email });

    // Check if the passwords match
    // Hash Hash Hash the passwords! Don't do this in production
    if (user?.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pass, ...result } = user;

      // Return Partial<> User object without the password
      return result;
    }

    throw new UnauthorizedException();
  }
}
```

## Authentication Controller

_See the [JSON Web Token Guard](JsonWebTokens.md) for more information about the `JwtService`_

```ts
// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalGuard } from '@/core/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwt: JwtService) {}
  /**
   * Login Endpoint
   *
   * @route /api/v1/auth/login
   *
   * @param {string} username
   * @param {string} password
   *
   * @returns {any}
   */
  @UseGuards(LocalGuard) // Use the LocalGuard to protect this route
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    // req.user is provided by the LocalGuard and should be a full User object

    // Createa JSON Web Token string
    const token: string = this.jwt.sign({
      id: req.user.id,
      email: req.user.email,
    });

    /*
      return payload
      {
        token: {string}
      }
    */
    return { token };
  }
}
```
