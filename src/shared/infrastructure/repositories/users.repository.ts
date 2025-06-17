import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/models/user.model';
import {
  IGetUserById,
  IUsersRepository,
} from 'src/shared/interfaces/users.respository.interface';
import { IUserAttributes } from '../database/models/user.model';
import {
  ICreateUserData,
  IUserFilter,
} from 'src/shared/interfaces/users.respository.interface';
import { WhereOptions } from 'sequelize';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(data: ICreateUserData): Promise<IUserAttributes> {
    return await this.userModel.create({
      ...data,
    } as CreationAttributes<User>);
  }

  async findOne(filter: IUserFilter): Promise<IUserAttributes | null> {
    return this.userModel.findOne({
      nest: true,
      raw: true,
      where: filter as WhereOptions<IUserAttributes>,
    }) as Promise<IUserAttributes | null>;
  }

  async findAll(): Promise<IUserAttributes[] | null> {
    return this.userModel.findAll();
  }

  async update(
    data: Partial<ICreateUserData>,
    filter: IUserFilter,
  ): Promise<any> {
    return this.userModel.update(data, {
      where: filter as WhereOptions<IUserAttributes>,
    });
  }

  async delete(filter: IUserFilter): Promise<any> {
    return this.userModel.destroy({
      where: filter as WhereOptions<IUserAttributes>,
    });
  }
  async findByEmail(email: string): Promise<IUserAttributes | null> {
    return this.userModel.findOne({ where: { email } });
  }

  renderUserProfile(filter: IGetUserById): Promise<IUserAttributes | null> {
    return this.userModel.findOne({
      where: { id: filter.id },
    });
  }
}
