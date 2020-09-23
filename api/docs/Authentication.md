# API Authentication

**Authentication is critical to ensuring access is granted only to specific users trying to access the API**

_See the [NestJS Documentation](https://docs.nestjs.com/techniques/authentication) for more details_

## Guards

NestJS Decorators used inside of a controller to make a protected route or the entire controller class

See the [Guards documentation](Guards.md) for more details on controller implementation

```ts
// src/core/guards/Pet.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PetStrategy } from '@/core/strategies/pet.strategy';

// Implementing the CanActivate interface is required
@Injectable()
export class PetGuard implements CanActivate {
  constructor(private readonly strategy: PetStrategy) {} // More details below

  /**
   * CanActivate::canActivate required method
   *
   * @param {ExecutionContext} context
   *
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /*
      Authentication logic
    */
  }
}
```

## Strategies

Similar to the Controller / Service pattern, Strategies contain logic required by a guard

```ts
// src/core/strategies/pet.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PetStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' }); // See hint at https://docs.nestjs.com/techniques/authentication#implementing-passport-local
  }
  /**
   * Validate provided credentials
   * PassportStrategy::validate override
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<any>}
   */
  async validate(email: string, password: string): Promise<any> {
    /*
      Validation Logic
    */
  }
}
```

## Current Auth Guards

- [Local Auth](guards/Local.md)
- [Json Web Tokens](guards/JsonWebTokens.md)

## 3rd Party Documentation

- [NestJS Authenticatio](https://docs.nestjs.com/techniques/authentication)
- [Passport Authentication](http://www.passportjs.org/)
- [JSON Web Tokens](https://jwt.io/)
