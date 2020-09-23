/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IGeneral } from '@/core/types';

@Injectable()
export class QueryService {
  /**
   * Insert into DB
   */
  async insert(repo: Repository<any>, data: IGeneral): Promise<any> {
    const toSave = repo.create(data);
    return repo.save(toSave);
  }

  /**
   * Find one record
   */
  async findOne(repo: Repository<any>, filter: any): Promise<any> {
    return repo.findOneOrFail(filter);
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
  async updateOne(repo: Repository<any>, data: IGeneral): Promise<any> {
    return repo.save(data);
  }

  /**
   * Delete one record
   * @todo Look into softDelete
   */
  async deleteOne(repo: Repository<any>, id: string): Promise<any> {
    return repo.delete(id);
  }
}
