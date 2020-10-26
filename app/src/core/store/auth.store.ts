import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { ApiClient, AxiosInstance, AxiosResponse } from '../utils/ApiClient';
import { NotifyStore } from './notify.store';
import { AccountStore } from './account.store';
import { UserStore } from './user.store';
import store from './store';

/**
 * API Client
 *
 * @var {AxiosInstance}
 */
const client: AxiosInstance = new ApiClient().client;

/**
 * Auth Store Class
 */
@Module({
  name: 'AuthStore',
  namespaced: true,
  dynamic: true,
  store,
})
class AuthStoreClass extends VuexModule {
  /**
   * Logged in status
   *
   * @var {boolean} isLoggedIn
   */
  get isLoggedIn(): boolean {
    return UserStore?.data?.record?.token !== undefined;
  }

  /**
   * Log Out
   */
  @Mutation
  Logout(): void {
    UserStore.REMOVE_RECORD();
    AccountStore.REMOVE_RECORD();
  }

  /**
   * Log in a user
   *
   * @param {IUser} user
   *
   * @returns {Promise<boolean>}
   */
  @Action({ rawError: true })
  async login(user: { email: string; password: string }): Promise<boolean> {
    try {
      const authResp: AxiosResponse = await client.post('auth/login', user);
      client.defaults.headers.common.Authorization = `Bearer ${authResp.data.token}`;

      const meResp: AxiosResponse = await client.get('me');
      const me = { ...meResp.data, token: authResp.data.token };
      UserStore.ADD_RECORD(me);

      return true;
    } catch (error) {
      NotifyStore.Error(`Login failed for email address ${user.email}`);
      return false;
    }
  }

  /**
   * Role Check
   *
   * @param {string|boolean} role
   *
   * @returns {Promise<boolean>}
   */
  @Action({ rawError: true })
  async roleCheck(role?: string | boolean): Promise<boolean> {
    try {
      if (!role) return true;
      role = role as string; // typecast
      const { data } = await client.get(`auth/role/${role}`);
      return data.status;
    } catch (error) {
      NotifyStore.Error(error.message);
      return false;
    }
  }
}

export const AuthStore = getModule(AuthStoreClass);
