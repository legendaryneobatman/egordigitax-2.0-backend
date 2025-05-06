import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ANALYTICS_CLIENT } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ANALYTICS_CLIENT,
      },
    ]),
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
