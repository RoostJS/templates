/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IGeneral } from '../types';

@Injectable()
export class QueryService {
  /**
   * Insert into DB
   */
  async insert(repo: Repository<any>, data: IGeneral): Promise<any> {
    return repo.save(data);
  }

  /**
   * Find one record
   */
  async findOne(repo: Repository<any>, data: IGeneral): Promise<any> {
    return repo.findOne(data);
  }

  /**
   * Find all records
   */
  async findAll(repo: Repository<any>, data?: IGeneral): Promise<any> {
    return repo.find(data);
  }

  /**
   * Update one record
   */
  async updateOne(
    repo: Repository<any>,
    id: string,
    part: IGeneral,
  ): Promise<any> {
    return repo.update(id, part);
  }

  /**
   * Delete one record
   * @todo Look into softDelete
   */
  async deleteOne(repo: Repository<any>, id: string): Promise<any> {
    return repo.delete(id);
  }
}
