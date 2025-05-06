import { Module } from '@nestjs/common';
import { APPLICATION_INJECT_PROVIDERS } from './application';
import { PRESENTATION_INJECT_PROVIDERS } from './presentation';
import { INFRA_INJECT_PROVIDERS } from './infra';

@Module({
  imports: [],
  controllers: [...PRESENTATION_INJECT_PROVIDERS],
  providers: [...APPLICATION_INJECT_PROVIDERS, ...INFRA_INJECT_PROVIDERS],
})
export class AppModule {}
