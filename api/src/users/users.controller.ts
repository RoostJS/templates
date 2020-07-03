import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { IUser } from './user.interface';
import { RolesGuard, Role, SuperOverride } from '../core/roles';
import { JwtAuthGuard } from '../core/auth';
import { randomString, DataService } from '../core/utils';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @SuperOverride()
  @Post()
  async createUser(@Body() body: Partial<IUser>): Promise<IUser> {
    const { ...user } = body;
    user.id = randomString();
    if (typeof user.account === 'string') {
      user.account = await this.data.use('account').findOne({
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
  @SuperOverride()
  @Get(':id')
  async getUserById(@Param() params: any): Promise<IUser> {
    return this.data.use('user').findOne({ id: params.id });
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
    @Param() params: any,
    @Body() body: Partial<IUser>,
  ): Promise<IUser> {
    const { ...user } = body;
    user.id = params.id;
    return this.data.use('user').updateOne(user);
  }
}
