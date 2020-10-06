// store/models/AccountModel.ts
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

/**
 * Account Interface
 */
export interface IAccount {
  id: string;
  name: string;
}

/**
 * Account Model
 */
export class AccountModel {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  name!: string;
}
