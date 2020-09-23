/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const DataServiceMock = {
  provide: 'DataService',
  useValue: {
    use: (namespace: string): any => {
      const mock = require(`./${namespace}Mock`)[`${namespace}Mock`];
      return {
        create: jest.fn(async (data: any): Promise<any> => data),
        findOne: jest.fn(async (data: any): Promise<any> => mock),
        findOneBy: jest.fn(async (data: any): Promise<any> => mock),
        updateOne: jest.fn(async (data: any): Promise<any> => data),
      };
    },
  },
};
