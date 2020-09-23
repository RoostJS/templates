import { SetMetadata } from '@nestjs/common';

export const Role = (role: string): any => SetMetadata('role', role);
