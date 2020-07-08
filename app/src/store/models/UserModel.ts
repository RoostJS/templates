// store/models/UserModel.ts
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IAccount } from './AccountModel';

/**
 * User Model Interface
 */
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  account: string | IAccount;
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
  @IsString()
  phone!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  password!: string;

  @Expose()
  @IsString()
  role!: string;

  @Expose()
  @IsString()
  account!: string;
}
