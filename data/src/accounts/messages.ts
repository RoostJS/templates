import { IMessage } from '../core/types';

const prefix = 'data_account';

export default class Messages {
  public static create: IMessage = { cmd: `${prefix}_create` };
  public static findOne: IMessage = { cmd: `${prefix}_find_one` };
  public static findAll: IMessage = { cmd: `${prefix}_find_all` };
  public static updateOne: IMessage = { cmd: `${prefix}_update_one` };
  public static deleteOne: IMessage = { cmd: `${prefix}_delete_one` };
}
