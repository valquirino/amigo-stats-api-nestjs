import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { ActivityRepository } from 'src/shared/infrastructure/repositories/activities.repository';
import { Activity } from 'src/shared/infrastructure/database/models/activity.models';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activites.controller';

@Module({
  imports: [DatabaseModule.forFeature([Activity])],
  controllers: [ActivitiesController],
  providers: [ActivityRepository, ActivitiesService],
  exports: [ActivityRepository],
})
export class ActivityModule {}
