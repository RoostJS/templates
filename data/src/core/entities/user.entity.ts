/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import { Account, IAccount } from './account.entity';

@Entity('User')
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    type: 'simple-enum',
    enum: ['admin', 'owner', 'user'],
    default: 'user',
  })
  role!: string;

  @ManyToOne(
    type => Account,
    account => account.users,
    { eager: true },
  )
  account!: IAccount | string;

  @AfterInsert()
  @AfterUpdate()
  removePassword(): void {
    delete this.password;
  }
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  account: IAccount;
}
