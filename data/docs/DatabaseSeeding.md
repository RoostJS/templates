# Database Seeding

## Admin

Currently the database is seeded with an Admin User when the Data service is initially spun up. This allows for immediate access to create and manage data across the entire stack. The credentials for this Admin account and user are provided both in the Seed Data and via the `.env` file:

```bash
## Seed
ADMIN_SECRET=admin
ADMIN_EMAIL=admin@thrubit.io
```

## Creating a new Seed

To create a new seed, add and call an additional private method to the [SeedService](src/core/seed/seed.service.ts).

Let's create a new `Pet` seed.

```ts
@Injectable()
export class SeedService implements OnApplicationBootstrap {

  // Add the new Data Point Repo to the contructor
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    private readonly query: QueryService,
  ) {}

  // Call Seed Method here
  async onApplicationBootstrap(): Promise<any> {
    try {
      // Order matters. Account is added first because User requires an account
      const account = await this.seedAccount();
      const user = this.seedUser(account);

      // Add new Seed method here
      const pets = this.seedPet(user)

      return true
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  ...

  // Create a new Seed Method
  private async seedPet(user: IUser): Promise<IPet> {
    const pet: IPet = {
      name: 'Sonic',
      type: 'hedgehog',
      age: 3
    }

    return this.query.insert(this.petRepo, pet);
  }

  ...

}
```

Now, when the Data service is initialized it will either create or update this `Pet` entry in the database.
