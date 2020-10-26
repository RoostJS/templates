/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { ConnectorService } from './connector.service';

import { IGeneralObj } from '@/core/types';

@Injectable()
export class DataService {
  private _prefix = 'data';
  private _namespace: string;

  constructor(private readonly connector: ConnectorService) {}

  /**
   * Service Setup
   *
   * @param {string} namespace
   */
  use(namespace: string): any {
    this._namespace = namespace;
    return this;
  }

  /**
   * Create item
   *
   * @param {any} data
   *
   * @return {Promise<any>}
   */
  async create(data: any): Promise<any> {
    return this.dataCall('create', data);
  }

  /**
   * Find All records
   *
   * @param {object} query
   *
   * @returns {Promise<any>}
   */
  async find(query: any, options: any): Promise<any> {
    return this.dataCall('find_all', { query, options });
  }

  /**
   * Find One by id
   *
   * @param {string} id
   *
   * @returns {Promise<any>}
   */
  async findOne(id: string): Promise<any> {
    return this.dataCall('find_one', { id });
  }

  /**
   * Find One by filter
   *
   * @param {IGeneralObj} data
   *
   * @returns {Promise<any>}
   */
  async findOneBy(data: IGeneralObj): Promise<any> {
    return this.dataCall('find_one_by', data);
  }

  /**
   * Update one item
   *
   * @param {any} data
   *
   * @return {Promise<any>}
   */
  async updateOne(data: any): Promise<any> {
    return this.dataCall('update_one', data);
  }

  /**
   * Data Service call
   * @param {string} command
   * @param {any} data
   *
   * @return {Promise<any>}
   */
  private dataCall(command: string, data: any): Promise<any> {
    const cmd = { cmd: `${this._prefix}_${this._namespace}_${command}` };
    return this.connector.data.send(cmd, data).toPromise();
  }
}
