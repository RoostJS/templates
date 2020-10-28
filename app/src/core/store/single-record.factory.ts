import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { AxiosInstance, AxiosResponse } from 'axios';

import { getFromLocal, saveToLocal } from '../utils/LocalStorage';
import { ApiClient } from '../utils/ApiClient';

import { INotify, NotifyStore } from './notify.store';
import store from './store';

/**
 * Single Record Store interface
 */
export interface ISingleRecordStore {
  data: { status: boolean; record: any };
  record: any;
  ADD_RECORD: (record: any) => void;
  REMOVE_RECORD: () => void;
  save: (record: any) => Promise<any>;
  update: (record: any) => Promise<any>;
  get: (id: string) => Promise<any>;
}

/**
 * Single Record Store Options
 */
export interface ISingleRecordStoreOptions {
  name: string;
  url: string;
  client?: AxiosInstance;
  notify?: INotify;
}

/**
 * Single Recod Store factory
 * Generate a new store that handles a single object as a record
 *
 * @param {string} name
 * @param {string} apiURL
 *
 * @returns {ISingleRecordStore}
 */
export function SingleRecordFactory<IRecord, INewRecord>(
  options: ISingleRecordStoreOptions
): ISingleRecordStore {
  // Sanitize Options
  const client = options.client || new ApiClient().client;
  const notify = options.notify || NotifyStore;

  /**
   * Single Record Store class
   */
  @Module({
    name: `${options.name}Store`,
    namespaced: true,
    dynamic: true,
    store,
  })
  class SingleRecordStore extends VuexModule {
    /**
     * Store Record
     *
     * @var {object} store
     */
    data: { status: boolean; record: IRecord } = {
      status: getFromLocal(options.name).length ? true : false,
      record: getFromLocal(options.name) as IRecord,
    };

    /**
     * Recrod Getter
     *
     * @returns {IRecord}
     */
    get record(): IRecord {
      return this.data.record;
    }

    /**
     * Add record to store
     *
     * @param {IRecord} record
     */
    @Mutation
    ADD_RECORD(record: IRecord): void {
      this.data.record = { ...this.data.record, ...record };
      this.data.status = true;

      saveToLocal(options.name, this.data.record);
    }

    /**
     * Remove record from the store
     */
    @Mutation
    REMOVE_RECORD(): void {
      this.data.record = {} as IRecord;
      this.data.status = false;
      saveToLocal(options.name, this.data.record);
    }

    /**
     * Save record to the API and the store
     *
     * @param {INewRecord} record
     *
     * @returns {Promise<IRecord>}
     */
    @Action({ commit: 'ADD_RECORD', rawError: true })
    async save(record: INewRecord): Promise<IRecord | void> {
      try {
        const resp: AxiosResponse = await client.post(options.url, record);
        return (resp as unknown) as IRecord;
      } catch (error) {
        notify.Error(error.message);
      }
    }

    /**
     * Update a record in the API and the store
     *
     * @param {IRecord} record
     *
     * @returns {Promise<IRecord>}
     */
    @Action({ commit: 'ADD_RECORD', rawError: true })
    async update(record: { id: string; [key: string]: any }): Promise<IRecord | void> {
      try {
        const { data } = await client.post(`${options.url}/${record.id}`);
        return data as IRecord;
      } catch (error) {
        notify.Error(error.message);
      }
    }

    /**
     * Get a record from the API by ID
     *
     * @param {string} id
     *
     * @returns {Promise<IRecord>}
     */
    @Action({ commit: 'ADD_RECORD', rawError: true })
    async get(id: string): Promise<IRecord | void> {
      try {
        const { data } = await client.get(`${options.url}/${id}`);
        return data as IRecord;
      } catch (error) {
        notify.Error(error.message);
      }
    }
  }

  return getModule(SingleRecordStore) as ISingleRecordStore;
}
