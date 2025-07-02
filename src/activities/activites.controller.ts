import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { IActivityAttributes } from 'src/shared/infrastructure/database/models/activity.models';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as atividades disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de atividades retornada com sucesso' })
  async getActivities(): Promise<IActivityAttributes[]> {
    return this.activitiesService.getActivities();
  }
}
