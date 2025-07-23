import { Injectable } from '@nestjs/common';
import { ActivityRepository } from 'src/shared/infrastructure/repositories/activities.repository';
import { IActivityAttributes } from 'src/shared/infrastructure/database/models/activity.models';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async getActivities(): Promise<IActivityAttributes[]> {    
    return this.activityRepository.list();
  }
}
