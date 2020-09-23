# Endpoint Services

Services are a better place to write the logic used by a controller

- [See the NestJS documentation for more information](https://docs.nestjs.com/providers#providers)
- [See the documentation about Interfaces here](Interfaces.md)

## Example Service

_Replace `pets` with the actual service name_

```ts
// src/pets/pets.service.ts
import { Injectable } from '@nestjs/common';
import { IPet } from './pet.interface';

@Injectable()
export class PetsService {
  // Method to create a pet
  async create(pet: IPet): Promise<IPet> {
    ...
  }

  // Method to get a pet's data
  async get(name: string): Promise<IPet> {
    ...
  }

  // Special helper function
  addNumber( x: number, y: number): number {
    return x + y; // Not all methods have to be async
  }
}
```

## Using a Service in a Controller

_Make sure the service being injected is available in this [endpoints module](https://docs.nestjs.com/providers#provider-registration) as well (`src/pets/pets.module.ts`)_

```ts
// src/pets/pets.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IPet } from './pet.interface';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  // Inject the service using the class constructor
  // You can also inject services inside of services using the constructor
  constructor(private readonly pet: PetsService) {}

  // Create a pet
  @Post()
  async createPet(@Body() body: IPet): Promise<IPet> {
    // Use the create method from the Pets Service
    return this.pet.create(body);
  }

  // Get data about a pet
  @Get(':name')
  async getPet(@Param('name') name: string): Promise<IPet> {
    // Use the get method from the Pets Service
    return this.pet.get(name);
  }

  // Add these numbers together
  @Get(':x/plus/:y')
  addNumbers(@Param() params: { [key: string]: number }): number {
    // Use the addNumber method from the Pets Service
    return this.pet.addNumber(params.x, params.y);
  }
}
```
