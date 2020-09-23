# API Endpoints

**Endpoints are HTTP(s) URL's that return a JSON payload. They are how the API is accessed**

- Controller names should be plural for better readability
  - `animal` should be `animals`

## Endpoint Module

The logic for each endpoint is isolated inside it's own module

_Replace `pets` with the actual endpoint name_

```bash
nest generate module pets
nest generate controller pets
```

_When using the [NestJS CLI](https://docs.nestjs.com/cli/usages#nest-generate) the proper module will automatically get updated to include any newly created Controllers or Services_

## Additional Endpoint Documentation

- [Endpoint Controllers](endpoints/Controllers.md)
- [Using Services](endpoints/Services.md)
- [Data Interfaces](endpoints/Interfaces.md)
