/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { User, IUser } from './user.entity';

@Entity('Account')
export class Account {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(
    type => User,
    user => user.account,
  )
  users: IUser[];
}

export interface IAccount {
  id: string;
  name: string;
  users: IUser[];
}
