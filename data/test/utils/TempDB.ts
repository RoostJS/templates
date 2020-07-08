/* eslint-disable @typescript-eslint/ban-types */
import { createConnection } from 'typeorm';

export async function TempDB(entities: any[]): Promise<any> {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
  });
}
