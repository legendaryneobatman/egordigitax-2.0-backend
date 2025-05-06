import { Module } from '@nestjs/common';
import { PRESENTATION_INJECT_PROVIDERS } from './presentation';

@Module({
  imports: [],
  controllers: [...PRESENTATION_INJECT_PROVIDERS],
  providers: [],
})
export class AppModule {}
