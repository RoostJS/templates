import { transformAndValidate } from 'class-transformer-validator';
import { UserModel } from '../UserModel';

describe('UserModel', () => {
  test('can validate response from BP API', async () => {
    const data = {
      firstName: 'Test',
      lastName: 'RoostJS',
      phone: '123-456-7890',
      email: 'test@roostjs.com',
      id: 'somerandomstring',
      password: 'somepass',
      role: 'admin',
      account: 'someaccount',
    };
    const user = await transformAndValidate(
      UserModel,
      data,
      { transformer: { excludeExtraneousValues: true } },
    );

    expect(user).toBeInstanceOf(UserModel);
  });
});
