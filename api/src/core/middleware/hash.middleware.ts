import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { StringService } from '@/core/services';

@Injectable()
export class HashMiddleware implements NestMiddleware {
  constructor(private readonly string: StringService) {}

  async use(
    req: Request,
    _res: Response,
    next: CallableFunction,
  ): Promise<void> {
    try {
      if (req?.body?.password) {
        req.body.password = await this.string.hash(req.body.password);
      }

      next();
    } catch (e) {
      console.error(e);
    }
  }
}
