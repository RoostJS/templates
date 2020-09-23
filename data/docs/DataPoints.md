# Data Points

**A Data Point is comprised of a Module, Controller, and a Data Entity.**

Replace `{name}` with the actual name of the data point _(`{Name}` with the uppercased version of the data point)_

## Data Point module and controller

```bash
$ nest generate module {name}
$ nest generate controller {name}
$ touch src/{name}/messages.ts
```

### Controller Template

```ts
import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { {Name} } from '../core/entities';
import Messages from './messages';
import Crud from '../core/utils/crud.controller';

const CrudController: any = Crud(Messages);

@Controller('{name}')
export class {Name}Controller extends CrudController {
  constructor(@InjectRepository({Name}) readonly repo: Repository<{Name}>) {
    super(repo);
  }
}

```

## Data Entity

```bash
$ touch src/core/entities/{name}.entity.ts
$ echo "export * from './{name}.entity';" >> src/core/entities/index.ts
```

### Entity Template

[See TypeORM documentation for more information.](https://typeorm.io/#/entities)

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('{Name}')
export class {Name} {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;
}

export interface I{Name} {
  id: string;
  name: string;
}
```
