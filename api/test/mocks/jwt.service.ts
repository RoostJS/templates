export const jwtToken = 'somejwtstring';
export const JwtServiceMock = {
  provide: 'JwtService',
  useValue: {
    sign: jest.fn(() => jwtToken),
  },
};
