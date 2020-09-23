/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const ConnectorServiceMock = (mock: any): any => {
  return {
    provide: 'ConnectorService',
    useValue: {
      data: {
        send: jest.fn((command: { cmd: string }, data: any) => {
          let result: any;
          switch (true) {
            case /data_[a-z]+_create/.test(command.cmd): {
              result = { ...mock, ...data };
              break;
            }
            case /data_[a-z]+_find_one/.test(command.cmd): {
              result = mock;
              break;
            }
            case /data_[a-z]+_update_one/.test(command.cmd): {
              result = { ...mock, ...data };
              break;
            }
            default: {
              result = false;
              break;
            }
          }

          return {
            toPromise: jest.fn(() => {
              return result;
            }),
          };
        }),
      },
    },
  };
};
