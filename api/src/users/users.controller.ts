import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';

import { INewUser, IUser } from '@/types';

import { Role } from '@/core/decorators';
import { JwtGuard, RolesGuard } from '@/core/guards';
import { randomString } from '@/core/helpers';
import { DataService } from '@/core/services';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
@Role('admin')
export class UsersController {
  constructor(private readonly data: DataService) {}

  /**
   * Create user
   *
   * @route POST /api/v1/users
   * @param {Partial<IUser>} data
   *
   * @return {Promise<IUser>}
   */
  @Post()
  async createUser(@Body() body: INewUser): Promise<IUser> {
    const { ...user } = body;
    if (typeof user.account === 'string') {
      user.account = await this.data.use('account').findOneBy({
        name: user.account,
      });
    }
    return this.data.use('user').create(user);
  }

  /**
   * Get User
   * Get User detail from :id
   *
   * @route GET /api/v1/users/:id
   * @param {string} id User ID
   *
   * @return {Promise<IUser>}
   */
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IUser> {
    return this.data.use('user').findOne(id);
  }

  /**
   * Update User by :id
   *
   * @route POST /api/v1/users/:id
   * @param {Partial<IUser>} data
   *
   * @return {Promise<IUser>}
   */
  @Post(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() body: Partial<IUser>,
  ): Promise<IUser> {
    const data = { id, ...body };
    return this.data.use('user').updateOne(data);
  }
}
