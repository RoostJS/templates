/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { QueryService } from './query.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IGeneral } from '../types';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

describe('QueryService', () => {
  let service: QueryService;
  let repo: Repository<User>;
  const user: IGeneral = {
    id: 'someid',
    firstName: 'somename',
    lastName: 'somelastname',
    phone: '1234567890',
    email: 'some@email.test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QueryService>(QueryService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(user as User);
    expect(await service.insert(repo, user)).toEqual(user as User);
  });

  it('should return for findOne', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user as User);
    expect(await service.findOne(repo, user)).toEqual(user as User);
  });

  it('should return for findAll', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce([user as User]);
    expect(await service.findAll(repo)).toEqual([user as User]);
  });

  it('should return for updateOne', async () => {
    const res = new UpdateResult();
    jest.spyOn(repo, 'update').mockResolvedValueOnce(res);
    expect(await service.updateOne(repo, user.id, user)).toEqual(res);
  });

  it('should return for deleteOne', async () => {
    const res = new DeleteResult();
    jest.spyOn(repo, 'delete').mockResolvedValueOnce(res);
    expect(await service.deleteOne(repo, user.id)).toEqual(res);
  });
});
