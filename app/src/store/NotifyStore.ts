// src/store/NotifyStore.ts
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store/store';

/**
 * Notice Interface
 */
export interface INotice {
  message: string;
  color: string;
  visible: boolean;
}

/**
 * Create a Notice object
 *
 * @param {string} message
 * @param {string} color
 */
const createNotice = (message: string, color: string): INotice => {
  return {
    message,
    color,
    visible: true,
  };
};

/**
 * Notify Store
 */
@Module({
  name: 'NotifyStore',
  namespaced: true,
  dynamic: true,
  store,
})
class Notify extends VuexModule {
  notice: INotice = {
    message: '',
    color: '',
    visible: false,
  };

  @Mutation
  SET_NOTICE_VISIBILITY(x: boolean): void {
    this.notice.visible = x;
  }

  @Mutation
  Error(message: string): void {
    this.notice = createNotice(message, 'error');
  }

  @Mutation
  Alert(message: string): void {
    this.notice = createNotice(message, 'warning');
  }

  @Mutation
  Info(message: string): void {
    this.notice = createNotice(message, 'info');
  }

  @Mutation
  Success(message: string): void {
    this.notice = createNotice(message, 'success');
  }
}

export const NotifyStore = getModule(Notify);
