import { IMessages, IMessage } from '@/core/types';

/**
 * Message Factory
 * Create a Messages class with the proper prefixed commands
 *
 * @param {string} prefix
 *
 * @returns {IMessages}
 */
export function MessageFactory(prefix: string): IMessages {
  const create: IMessage = { cmd: `data_${prefix}_create` };
  const findOne: IMessage = { cmd: `data_${prefix}_find_one` };
  const findOneBy: IMessage = { cmd: `data_${prefix}_find_one_by` };
  const findAll: IMessage = { cmd: `data_${prefix}_find_all` };
  const updateOne: IMessage = { cmd: `data_${prefix}_update_one` };
  const deleteOne: IMessage = { cmd: `data_${prefix}_delete_one` };

  return { create, findOne, findOneBy, findAll, updateOne, deleteOne };
}
