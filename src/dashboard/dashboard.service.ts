import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../shared/infrastructure/repositories/dashboards.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getLatest(userId: number) {
    return this.dashboardRepository.getLatest({ userId });
  }

  async getCounts(userId: number) {
    return this.dashboardRepository.getCounts({ userId });
  }
}
