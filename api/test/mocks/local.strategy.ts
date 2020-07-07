export const LocalStrategyMock = {
  provide: 'LocalStrategy',
  useValue: {
    validate: jest.fn(),
  },
};
