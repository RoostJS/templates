import { SetMetadata } from '@nestjs/common';

export const SuperOverride = () => SetMetadata('superKey', true);
