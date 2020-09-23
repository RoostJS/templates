# Endpoint Controller

The Controller is where our routes are registered to a specific URL

_See the [NestJS Documentation for more details](https://docs.nestjs.com/controllers)_

## Example Controller

_Replace `pets` and `Pets` with the actual endpoint names_

```ts
// src/pets/pets.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('pets')
export class PetsController {

  /**
   * Create {name}
   *
   * @see https://docs.nestjs.com/controllers#request-object
   *
   * @route POST /api/v1/pets
   * @param {any} data
   *
   * @return {Promise<any>}
   */
  @Post()
  async createAccount(@Body() body): Promise<any> {
    ...
  }

  /**
   * Get account by :id
   *
   * @see https://docs.nestjs.com/controllers#request-object
   *
   * @route GET /api/v1/pets/:id
   * @param {string} id
   *
   * @return {Promise<any>}
   */
  @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<any> {
    ...
  }

  /**
   * Update account by :id
   *
   * @see https://docs.nestjs.com/controllers#request-object
   *
   * @route POST /api/v1/pets/:id
   * @param {any} data
   *
   * @return {Promise<any>}
   */
  @Post()
  async updateAccountById(@Body() body: any): Promise<any> {
    ...
  }
}
```

## Notes

- The URL prefix of `api/v1` is set in `src/main.ts` using the `app.setGlobalPrefix()` function.
- The URL structure is determined by the value provided to the `@Controller` decorator
- `@Post()` and `@Get()` decorators are used to define what HTTP verb this endpoint will listen for

## Route Parameters

_[See the NestJS docs for more info on Route Parameters](https://docs.nestjs.com/controllers#route-parameters)_

Providing a value to `@Post()` and `@Get()` decorators enables dynamic URL paths. For example, using `@Get(':animal')` would allow for a URL of `api/v1/pets/cat` and `api/v1/pets/dog` to both be valid API URL's.

More than one route parameters can be used as well. For example, `@Get(':name/age/:age')` would allow for URL's of `api/v1/pets/niko/age/9` and `api/v1/pets/sparky/age/4` to be valid.

There are two ways we can extract these dynamic values in our controller method:

```ts
// Use individual method arguments
@Get(':name/age/:age')
async petData( @Param('name') name: string, @Param('age') age: number ): Promise<any> {

  console.log('Pet Name', name);
  console.log('Pet Age', age);

}
// Becomes tedious the more route parameters there are
```

```ts
// Use a params object
@Get(':name/age/:age')
async petData( @Param() params: {[key: string]: any} ): Promise<any> {

  console.log('Pet Name', params.name);
  console.log('Pet Age', params.age);

}
// Easier with multiple route parameters
```
