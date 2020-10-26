/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Core
import { QueryService } from '@/core/services';
import { Account, IAccount, IUser, User } from '@/entities';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly query: QueryService,
  ) {}

  async onApplicationBootstrap(): Promise<any> {
    const account = await this.seedAccount();
    const user = await this.seedUser(account);
    return true;
  }

  private async seedAccount(): Promise<IAccount | void> {
    try {
      const account = {
        name: '{{Slug}}',
      };

      const resp = await this.query.insert(this.accountRepo, account);
      return resp;
    } catch (error) {
      return;
    }
  }

  private async seedUser(account: IAccount | void): Promise<IUser | void> {
    try {
      if (!account) {
        return;
      }

      const user = {
        email: process.env.ADMIN_EMAIL || 'admin@{{Slug}}.local',
        password: process.env.ADMIN_SECRET || 'admin',
        role: 'admin',
        account: account,
      };

      const resp = await this.query.insert(this.userRepo, user);
      return resp;
    } catch (error) {
      return;
    }
  }
}
