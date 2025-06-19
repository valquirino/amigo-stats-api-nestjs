import { Controller, Get, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DashboardService } from './dashboard.service';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}
  @Get('latest')
  async getLatest() {
    return await this.dashboardService.getLatest(this.request.user.userId);
  }

  @Get('counts')
  async getCounts() {
    return await this.dashboardService.getCounts(this.request.user.userId);
  }
}
