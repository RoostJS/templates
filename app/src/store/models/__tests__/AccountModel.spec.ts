import { transformAndValidate } from 'class-transformer-validator';
import { AccountModel } from '../AccountModel';

describe('AccountModel', () => {
  it('can validate response from BP API', async () => {
    const data = {
      name: 'testaccount',
      type: 'l3',
      id: 'somerandomeid',
    };

    const account = await transformAndValidate(
      AccountModel,
      data,
      { transformer: { excludeExtraneousValues: true } },
    );

    expect(account).toBeInstanceOf(AccountModel);
  });
});
