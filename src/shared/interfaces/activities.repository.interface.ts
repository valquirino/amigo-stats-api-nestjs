import { IActivityAttributes } from '../infrastructure/database/models/activity.models';

export interface ICreateActivityData {
  user: string;
  actionType: 'create' | 'edit' | 'delete' | 'update';
  entity: string;
  description: string;
}

export interface IActivityRepository {
  createActivity(data: ICreateActivityData): Promise<IActivityAttributes>;
  listActivities(): Promise<IActivityAttributes[]>;
}
