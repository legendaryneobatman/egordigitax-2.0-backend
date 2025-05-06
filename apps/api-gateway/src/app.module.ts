import { Module } from '@nestjs/common';
import { APPLICATION_INJECT_PROVIDERS } from './application';
import { PRESENTATION_INJECT_PROVIDERS } from './presentation';
import { INFRA_INJECT_MODULES } from './infra';

@Module({
  imports: [...INFRA_INJECT_MODULES],
  controllers: [...PRESENTATION_INJECT_PROVIDERS],
  providers: [...APPLICATION_INJECT_PROVIDERS],
})
export class AppModule {}
