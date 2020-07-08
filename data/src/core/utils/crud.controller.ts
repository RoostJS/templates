/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MessagePattern } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { QueryService } from './query.service';
import { IMessages, IGeneralWithId, IGeneral } from '../types';

export default function(messages: IMessages): any {
  class CrudController {
    protected repo: Repository<any>;
    private query: QueryService;

    constructor(repo: Repository<any>) {
      this.query = new QueryService();
      this.repo = repo;
    }

    /**
     * Create
     *
     * @todo Implement Encryption
     * @todo Implement API Token check
     * @todo Create generic Data interface
     * @todo Create generic Return interface
     *
     * @param {any} data Data to be used by repo
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.create)
    async create(data: IGeneral): Promise<any> {
      return this.query.insert(this.repo, data);
    }

    /**
     * Get One
     *
     * @param {any} data Filter data
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.findOne)
    async findOne(data: IGeneral): Promise<any> {
      return this.query.findOne(this.repo, data);
    }

    /**
     * Get All
     *
     * @param {any} filter Filter data
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.findAll)
    async findAll(filter?: IGeneral): Promise<any> {
      return this.query.findAll(this.repo, filter);
    }

    /**
     * Update One
     * Extracts ID from provided data
     *
     * @param {IGeneralWithId} data
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.updateOne)
    async updateOne(data: IGeneralWithId): Promise<any> {
      const { id, ...part } = data;
      return this.query.updateOne(this.repo, id, part);
    }

    /**
     * Delete One
     *
     * @param {string} id Record to delete
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.deleteOne)
    async deleteOne(id: string): Promise<any> {
      return this.query.deleteOne(this.repo, id);
    }
  }

  return CrudController;
}
