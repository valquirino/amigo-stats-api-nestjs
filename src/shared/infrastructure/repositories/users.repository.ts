import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/models/user.model';
import { IUsersRepository } from 'src/shared/interfaces/users.respository.interface';
import { IUserAttributes } from '../database/models/user.model';
import {
  ICreateUserData,
  IUserFilter,
} from 'src/shared/interfaces/users.respository.interface';
import { WhereOptions } from 'sequelize';
import { CreationAttributes } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(data: ICreateUserData): Promise<IUserAttributes> {
    console.log(data.password)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userModel.create({
      ...data,
      password: hashedPassword,
    } as CreationAttributes<User>);

    return user.toJSON();
  }

  async findOne(filter: IUserFilter): Promise<IUserAttributes | null> {
    return this.userModel.findOne({
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
}
