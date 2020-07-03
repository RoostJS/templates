import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { RolesGuard, Role, SuperOverride } from '../core/roles';
import { JwtAuthGuard } from '../core/auth';
import { IAccount } from './account.interface';
import { randomString, DataService } from '../core/utils';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @SuperOverride()
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
  @SuperOverride()
  @Get(':id')
  async getAccountById(@Param() params: any): Promise<IAccount> {
    return this.data.use('account').findOne({ id: params.id });
  }

  /**
   * Update account by :id
   *
   * @route POST /api/v1/accounts/:id
   * @param {IAccount} data
   *
   * @return {Promise<IAccount>}
   */
  @Post()
  updateAccountById(@Body() body: Partial<IAccount>): Promise<IAccount> {
    return this.data.use('account').updateOne(body);
  }
}
