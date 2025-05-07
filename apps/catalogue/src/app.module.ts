import { Module } from '@nestjs/common';
import { PRESENTATION_INJECT_PROVIDERS } from './presentation';
import { APPLICATION_INJECT_PROVIDERS } from './application';
import { INFRA_INJECT_PROVIDES } from './infra';

@Module({
  controllers: [...PRESENTATION_INJECT_PROVIDERS],
  providers: [...APPLICATION_INJECT_PROVIDERS, ...INFRA_INJECT_PROVIDES],
})
export class AppModule {}
