import { Connection, Repository } from 'typeorm';
import { TempDB } from '../utils/TempDB';
import { User, Account } from '../../src/core/entities';
import { AccountMock, UserMock } from '../utils/mocks';

describe('Account and User Entitiy', () => {
  let db: Connection;
  let userRepo: Repository<User>;
  let accountRepo: Repository<Account>;

  beforeAll(async () => {
    db = await TempDB([User, Account]);
    userRepo = db.getRepository(User);
    accountRepo = db.getRepository(Account);
  });

  afterAll(() => db.close());

  it('should create temp repos', async () => {
    expect(accountRepo).toBeDefined();
    expect(userRepo).toBeDefined();
  });

  it('should create a new account', async () => {
    const account = await accountRepo.insert(AccountMock);
    expect(account).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await userRepo.insert(UserMock);
    expect(user).toBeDefined();
  });

  it('should find an account', async () => {
    const account = await accountRepo.findOne({
      where: { id: AccountMock.id },
    });
    expect(account).toBeDefined();
    expect(account.users).not.toBeDefined();
    expect(account.name).toEqual(AccountMock.name);
  });

  it('should find a user', async () => {
    const user = await userRepo.findOne({ where: { id: UserMock.id } });
    expect(user).toBeDefined();
    expect(user.account).toBeDefined();
    expect(user.email).toEqual(UserMock.email);
    expect(user.account.id).toEqual(AccountMock.id);
  });

  it('will fail when creating duplicate account', async () => {
    try {
      await accountRepo.insert(AccountMock);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('will fail when creating duplicate user', async () => {
    try {
      await userRepo.insert(UserMock);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
