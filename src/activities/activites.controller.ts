import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { IActivityAttributes } from 'src/shared/infrastructure/database/models/activity.models';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getActivities(): Promise<IActivityAttributes[]> {
    return this.activitiesService.getActivities();
  }
}
