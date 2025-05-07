import { ModuleMetadata } from '@nestjs/common';
import { PrismaService, REPOSITORIES_INJECT_PROVIDES } from './prisma';

export const PRISMA_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  PrismaService,
  ...REPOSITORIES_INJECT_PROVIDES,
];
