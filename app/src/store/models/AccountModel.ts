import { Expose } from 'class-transformer';
import { IsString, IsArray } from 'class-validator';

export interface IAccount {
  id: string;
  name: string;
  type: string;
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

  @Expose()
  @IsString()
  type!: string;
}
