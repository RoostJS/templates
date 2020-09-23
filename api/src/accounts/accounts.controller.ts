import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';

import { IAccount } from './account.interface';

import { Role } from '@/core/decorators';
import { JwtGuard, RolesGuard } from '@/core/guards';
import { randomString } from '@/core/helpers';
import { DataService } from '@/core/services';

@Controller('accounts')
@UseGuards(JwtGuard, RolesGuard)
@Role('admin')
export class AccountsController {
  constructor(private readonly data: DataService) {}

  /**
   * Create account
   *
   * @route POST /api/v1/accounts
   * @param {Partial<IAccount>} data
   *
   * @return {Promise<IAccount>}
   */
  @Post()
  async createAccount(@Body() body: Partial<IAccount>): Promise<IAccount> {
    const account = { ...body };
    account.id = randomString();
    return this.data.use('account').create(account);
  }

  /**
   * Get account by :id
   *
   * @route GET /api/v1/accounts/:id
   * @param {string} id
   *
   * @return {Promise<IAccount>}
   */
  @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<IAccount> {
    return this.data.use('account').findOne(id);
  }

  /**
   * Update account by :id
   *
   * @route POST /api/v1/accounts/:id
   * @param {string} id
   * @param {IAccount} data
   *
   * @return {Promise<IAccount>}
   */
  @Post(':id')
  updateAccountById(
    @Param('id') id: string,
    @Body() body: Partial<IAccount>,
  ): Promise<IAccount> {
    const data = { id, ...body };
    return this.data.use('account').updateOne(data);
  }
}
