/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MessagePattern } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { QueryService } from '@/core/services';
import { IMessages, IGeneralWithId, IGeneral } from '@/core/types';

/**
 * Crud Controller Factory
 * Used to wrap the returned class
 * Needed to provide the messages object to the Pattern decorators
 *
 * @param {IMessages} messages
 */
export function CrudControllerFactory(messages: IMessages): any {
  /**
   * Crud Controller Class
   * Extended by Data Point Controllers
   */
  class CrudController {
    private query!: QueryService;
    protected repo!: Repository<any>;

    /**
     * Class Constructor
     *
     * @param {Repository<any>} repo
     */
    constructor(repo: Repository<any>) {
      this.query = new QueryService();
      this.repo = repo;
    }

    /**
     * Create
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
    async findOne(data: { id: string }): Promise<any> {
      return this.query.findOne(this.repo, data.id);
    }

    /**
     * Get One By key
     *
     * @param {IGeneral} filter
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.findOneBy)
    async findOneBy(filter: IGeneral): Promise<any> {
      return this.query.findOne(this.repo, filter);
    }

    /**
     * Get All
     *
     * @param {any} filter Filter data
     *
     * @return {Promise<any>}
     */
    @MessagePattern(messages.findAll)
    async findAll(data: { query?: any; options?: any }): Promise<any> {
      return this.query.findAll(this.repo, data);
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
      return this.query.insert(this.repo, data);
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
