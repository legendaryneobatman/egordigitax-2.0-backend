import { applyDecorators } from '@nestjs/common';

export type ControllerMethods<T> = {
  [K in keyof T]?: () => never;
};
