// store/models/UserModel.ts
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IAccount } from '@/store';

/**
 * User Model Interface
 */
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  account: string | IAccount;
  token?: string;
}

/**
 * User Model
 */
export class UserModel {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  firstName!: string;

  @Expose()
  @IsString()
  lastName!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  role!: string;

  @Expose()
  account!: string | IAccount;

  @Expose()
  @IsString()
  @IsOptional()
  token?: string;
}
