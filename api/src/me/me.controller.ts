/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

// Core
import { JwtGuard } from '@/core/guards';
import { DataService } from '@/core/services';

import { IUser } from '@/types';

@UseGuards(JwtGuard)
@Controller('me')
export class MeController {
  constructor(private readonly data: DataService) {}

  /**
   * My use details
   *
   * @route GET /api/v1/me
   *
   * @returns {IUser}
   */
  @Get()
  async getMe(@Request() req: any): Promise<IUser> {
    return this.data.use('user').findOne(req.user.id);
  }

  /**
   * Update details about myself
   *
   * @route POST /api/v1/me
   *
   * @return {IUser}
   */
  @Post()
  async updateMe(
    @Request() req: any,
    @Body() body: Partial<IUser>,
  ): Promise<IUser> {
    // Add ID
    const data = { id: req.user.id, ...body };

    // Prevent me from updating my role
    if (data.role) {
      delete data.role;
    }

    // Update data
    return this.data.use('user').updateOne(data);
  }
}
