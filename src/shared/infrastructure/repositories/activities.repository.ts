import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from 'src/shared/infrastructure/database/models/activity.models';
import { IActivityAttributes } from '../database/models/activity.models';
import { ICreateActivityData } from 'src/shared/interfaces/activities.repository.interface';
import { CreationAttributes } from 'sequelize';
@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity)
    private readonly activityModel: typeof Activity,
  ) {}

  async create(data: ICreateActivityData): Promise<IActivityAttributes> {
    const activity = await this.activityModel.create(
      data as CreationAttributes<Activity>,
    );

    return activity.toJSON();
  }

  async list(): Promise<IActivityAttributes[]> {
    const activities = await this.activityModel.findAll({
      order: [['date', 'DESC']],
    });

    return activities.map((activity) => activity.get({ plain: true }));
  }
}
