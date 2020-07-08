/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Account, IAccount } from './account.entity';

@Entity('User')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'simple-enum',
    enum: ['super', 'admin', 'user'],
    default: 'user',
  })
  role: string;

  @ManyToOne(
    type => Account,
    account => account.users,
    { eager: true },
  )
  account: IAccount;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  account: IAccount;
}
