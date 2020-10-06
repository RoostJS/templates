/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StringService, QueryService } from '@/core/services';
import { User, Account, IAccount, IUser } from '@/core/entities';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly query: QueryService,
    private readonly string: StringService,
  ) {}

  async onApplicationBootstrap(): Promise<any> {
    try {
      const account = await this.seedAccount();
      const user = await this.seedUser(account);

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private async seedAccount(): Promise<IAccount | void> {
    const account = {
      id: '{{Slug}}-admin',
      name: '{{Slug}}',
    };

    return this.query.insert(this.accountRepo, account);
  }

  private async seedUser(account: IAccount | void): Promise<IUser | void> {
    if (!account) {
      return;
    }

    const user = {
      id: '{{Slug}}-admin',
      firstName: '{{Slug}}',
      lastName: 'Admin',
      password: await this.string.hash(process.env.ADMIN_SECRET),
      email: process.env.ADMIN_EMAIL,
      role: 'admin',
      account: account,
    };

    return this.query.insert(this.userRepo, user);
  }
}
