import { Injectable } from '@nestjs/common';
import ConnectorService from '../services/connector.service';
import { IGeneralObj } from '../types';

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
   * Find One by filter
   *
   * @param {IGeneralObj} data
   *
   * @returns {Promise<any>}
   */
  async findOne(data: IGeneralObj): Promise<any> {
    return this.dataCall('find_one', data);
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
