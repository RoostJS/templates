export const JwtStrategyMock = {
  provide: 'JwtStrategy',
  useValue: {
    validate: jest.fn(),
  },
};
