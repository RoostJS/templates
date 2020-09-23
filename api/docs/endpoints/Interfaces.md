# Data Interfaces

Interfaces allow for us to ensure we are recieving a properly formated object.

## Example Interface

_I generally do not use a plural names for interfaces as it is supposed to represent a single entity_

```ts
// src/pets/pet.interface.ts
export interface IPet {
  readonly name: string;
  readonly age: number;
  readonly type: string;
}
```

## Using in a Controller

```ts
// src/pets/pets.controller.ts
import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { IPet } from './pet.interface';

@Controller('pets')
export class PetsController {
  // Post endpoint to create a new pet
  @Post()
  async createPet(@Body() body: IPet): Promise<IPet> {
    /*
      body must now comply with the IPet interface
      The JSON payload would look like:
        {"name": "Niko", "age": 9, "type": "cat"}
    */
  }

  // Get all pets
  @Get()
  async getAllPets(): Promise<IPet[]> {
    // return an array of IPet objects
  }

  // Update info for a specific pet
  @Post(':name')
  async updatePet(
    @Param('name') name: string,
    @Body() body: Partial<IPet>,
  ): Promise<IPet> {
    /*
      @Param('name') extracts the pet name for us
      @Body() reads the JSON payload of the changes that need to be made:
        {"age": 10}
      Happy birthday Niko!
      But, the JSON payload doesn't match the full IPet interface
      This is where the Partial<> Typescript type is helpful
      Partial<> essentially makes all properties of an inteface optional
        interface IPet {
          name?: string;
          age?: number;
          type?: string;
        }
    */
  }
}
```
