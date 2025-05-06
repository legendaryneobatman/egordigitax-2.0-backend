import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  findAll() {
    return 'mock find all response in gateway.analytics';
  }
}
