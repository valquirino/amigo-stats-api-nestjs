import { Controller, Get, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DashboardService } from './dashboard.service';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Get('latest')
  @ApiOperation({ summary: 'Obter os dados mais recentes do dashboard' })
  @ApiResponse({ status: 200, description: 'Dados mais recentes retornados com sucesso' })
  async getLatest() {
    return await this.dashboardService.getLatest(this.request.user.userId);
  }

  @Get('counts')
  @ApiOperation({ summary: 'Obter contagens gerais para o dashboard' })
  @ApiResponse({ status: 200, description: 'Contagens retornadas com sucesso' })
  async getCounts() {
    return await this.dashboardService.getCounts(this.request.user.userId);
  }
}
