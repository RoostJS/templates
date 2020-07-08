export interface IMessage {
  cmd: string;
}

export interface IMessages {
  create: IMessage;
  findOne: IMessage;
  findAll: IMessage;
  updateOne: IMessage;
  deleteOne: IMessage;
}

export interface IGeneral {
  [key: string]: any;
}

export interface ICrud {
  create(): Promise<any>;
  findOne(): Promise<any>;
  findAll(): Promise<any>;
  updateOne(): Promise<any>;
  deleteOne(): Promise<any>;
}

export interface IGeneralWithId {
  id: string;
  [key: string]: any;
}
