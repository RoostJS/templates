import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

// Core
import { ApiClient, AxiosInstance, AxiosResponse } from '@/core/utils/ApiClient';
import { clearLocalStorage } from '@/core/utils/LocalStorage';
import { roleCheck } from '@/core/utils/role.utility';
import { NotifyStore } from '@/core/store';
import store from '@/core/store/store';

// Store
import { UserStore } from './user.store';

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
    clearLocalStorage();
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
    return roleCheck(role);
  }
}

export const AuthStore = getModule(AuthStoreClass);
