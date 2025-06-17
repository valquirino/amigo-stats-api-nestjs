import { IUserAttributes } from '../infrastructure/database/models/user.model';

export interface ICreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUserFilter {
  id?: number;
  name?: string;
  email?: string;
}
export interface IGetUserById {
  id: number;
}

export interface IUserUpdatepa {
  name: string;
  email: string;
}
export interface IUsersRepository {
  create(data: ICreateUserData): Promise<IUserAttributes>;
  findOne(filter: IUserFilter): Promise<IUserAttributes | null>;
  findAll(): Promise<IUserAttributes[] | null>;
  update(data: Partial<ICreateUserData>, filter: IUserFilter): Promise<any>;
  delete(filter: IUserFilter): Promise<any>;
  findByEmail(email: string): Promise<IUserAttributes | null>;
  renderUserProfile(filter: IGetUserById): Promise<IUserAttributes | null>;
}
