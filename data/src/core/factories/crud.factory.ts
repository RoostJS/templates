import { IMessages } from '@/core/types';
import { CrudControllerFactory } from '@/core/controllers';
import { MessageFactory } from './message.factory';

/**
 * Crud Factory
 * Define the messages to be used in the CrudController class
 *
 * @param {string} prefix
 *
 * @returns {any} CrudController
 */
export function CrudFactory(prefix: string): any {
  const messages: IMessages = MessageFactory(prefix);

  return CrudControllerFactory(messages);
}
