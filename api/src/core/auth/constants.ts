import { IGeneralObj } from '../types';

export const jwtConstants: IGeneralObj = {
  secret: process.env.JWT_SECRET,
};
