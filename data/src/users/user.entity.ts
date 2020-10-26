/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

// Core
import { StringService } from '@/core/services';
import { Default } from '@/core/entities/default.entity';
import { Account, IAccount } from '@/entities';


import { Roles } from '@/types';

@Entity('User')
export class User extends Default {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @ManyToOne(
    type => Account,
    account => account.users,
    { eager: true },
  )
  account: IAccount | string;

  @AfterInsert()
  @AfterUpdate()
  removePassword(): void {
    delete this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const service = new StringService();
    this.password = await service.hash(this.password);
  }
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  account: IAccount;
}

export interface INewUser {
  email: string;
  password: string;
  role: Roles;
  account: IAccount | string;
}
