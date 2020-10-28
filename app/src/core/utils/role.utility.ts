import { NotifyStore } from '../store';
import { ApiClient } from './ApiClient';
/**
 * Role Check utility
 *
 * @param {string|boolean} role
 *
 * @returns {Promise<boolean>}
 */
export async function roleCheck(role?: string | boolean): Promise<boolean> {
  try {
    if (!role) return true;
    role = role as string; // typecast
    const client = new ApiClient().client;
    const { data } = await client.get(`auth/role/${role}`);
    return data.status;
  } catch (error) {
    NotifyStore.Error(error.message);
    return false;
  }
}
