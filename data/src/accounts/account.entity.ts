/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToMany } from 'typeorm';

// Core
import { Default } from '@/core/entities/default.entity';
import { User, IUser } from '@/users/user.entity';

@Entity('Account')
export class Account extends Default {
  @Column({
    unique: true,
  })
  name!: string;

  @OneToMany(
    type => User,
    user => user.account,
  )
  users!: IUser[];
}

export interface IAccount {
  id: string;
  name: string;
  users: IUser[];
}

export interface INewAccount {
  name: string;
}
