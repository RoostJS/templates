export interface IGeneralObj {
    [key: string]: any;
  }
  
  export interface IRole {
    role: string;
    priority: number;
  }
  
  export const jwtConstants: IGeneralObj = {
    secret: process.env.JWT_SECRET || '{{Slug}}',
  };