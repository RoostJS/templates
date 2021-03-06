import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { AxiosInstance } from 'axios';

import { ApiClient } from '../utils/ApiClient';
import { getFromLocal, saveToLocal } from '../utils/LocalStorage';
import { searchArray } from '../utils/array.utility';

import { INotify, NotifyStore } from './notify.store';
import store from './store';

/**
 * MultiRecord Store interface
 */
export interface IMultiRecordStore {
  data: { status: boolean; records: any[] };
  records: any[];
  ADD_RECORD: (record: any) => void;
  REMOVE_RECORD: (id: string) => void;
  REMOVE_RECORDS: () => void;
  add: (record: any) => Promise<any>;
  update: (record: any) => Promise<any>;
  get: (id: string) => Promise<any>;
  refresh: () => Promise<any[]>;
}

/**
 * MultiRecord Store Options
 */
export interface IMultiRecordOptions {
  name: string;
  url: string;
  client?: AxiosInstance;
  notify?: INotify;
}

/**
 * MultiRecord Store factory
 * Generate a new store that can handle multiple records
 *
 * @param {string} name
 * @param {string} apiURL
 *
 * @returns {IMultiRecordStore}
 */
export function MultiStoreFactory<IRecord, INewRecord>(
  options: IMultiRecordOptions
): IMultiRecordStore {
  // Sanitize Options
  const client = options.client || new ApiClient().client;
  const notify = options.notify || NotifyStore;

  /**
   * MultiRecordStore class
   */
  @Module({
    name: `${options.name}Store`,
    namespaced: true,
    dynamic: true,
    store,
  })
  class MultiRecordStore extends VuexModule {
    /**
     * Store
     *
     * @var {object} store
     */
    data: { status: boolean; records: IRecord[] } = {
      status: getFromLocal(options.name).length ? true : false,
      records: getFromLocal(options.name) as IRecord[],
    };

    /**
     * Records Getter
     *
     * @returns {IRecord[]}
     */
    get records(): IRecord[] {
      return this.data.records;
    }

    /**
     * Add a record to the array
     *
     * @param {IRecord} record
     */
    @Mutation
    ADD_RECORD(record: any): void {
      const item = searchArray(this.data.records, 'id', record.id);

      if (item === undefined) {
        this.data.records = [...this.data.records, record];
      } else {
        this.data.records[item.index] = { ...item.value, ...record } as IRecord;
      }

      this.data.status = true;
      saveToLocal(options.name, this.data.records);
    }

    /**
     * Add multiple records at once
     *
     * @param {IRecord[]} records
     */
    @Mutation
    ADD_RECORDS(records: IRecord[]): void {
      this.data.records = records;

      this.data.status = true;
      saveToLocal(options.name, this.data.records);
    }

    /**
     * Remove a record from the array
     *
     * @param {string} id
     */
    @Mutation
    REMOVE_RECORD(id: string): void {
      const item = searchArray(this.data.records, 'id', id);
      if (item) {
        delete this.data.records[item.index];
      }

      this.data.status = false;
      saveToLocal(options.name, this.data.records);
    }

    /**
     * Remove All records
     */
    @Mutation
    REMOVE_RECORDS(): void {
      this.data.records = [];

      this.data.status = false;
      saveToLocal(options.name, this.data.records);
    }

    /**
     * Add record after saving to API
     *
     * @param {INewRecord} record
     *
     * @returns {Promise<IRecord>}
     */
    @Action({ commit: 'ADD_RECORD', rawError: true })
    async add(record: INewRecord): Promise<IRecord | void> {
      try {
        const { data } = await client.post(options.url, record);
        return data;
      } catch (error) {
        notify.Error(error.message);
      }
    }

    /**
     * Update the details of a record
     *
     * @param {IRecord} record
     *
     * @returns {Promise<IRecord>}
     */
    @Action({ commit: 'ADD_RECORD', rawError: true })
    async update(record: any): Promise<IRecord | void> {
      try {
        let { data } = await client.post(`${options.url}/${record.id}`, record);
        data = { ...record, ...data };
        return data;
      } catch (error) {
        notify.Error(error.message);
      }
    }

    /**
     * Get a single record from the store
     *
     * @param {string} id
     *
     * @returns {Promise<IRecord>}
     */
    @Action({ commit: 'ADD_RECORD', rawError: true })
    async get(id: string): Promise<IRecord | void> {
      try {
        const { data } = await client.get(`${options.url}/${id}`);
        return data;
      } catch (error) {
        notify.Error(error.message);
      }
    }

    /**
     * Refresh all records from API
     *
     * @returns {Promise<IRecord[]>}
     */
    @Action({ commit: 'ADD_RECORDS', rawError: true })
    async refresh(): Promise<IRecord[] | void> {
      try {
        const { data } = await client.get(`${options.url}`);
        return data;
      } catch (error) {
        notify.Error(error.message);
      }
    }
  }

  return getModule(MultiRecordStore) as IMultiRecordStore;
}
