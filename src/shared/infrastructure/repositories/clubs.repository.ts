import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Club } from '../database/models/club.model';
import {
  IClubSearchByName,
  IClubsRepository,
} from 'src/shared/interfaces/clubs.repository.interface';
import {
  ICreateClubData,
  IClubFilterFindAll,
  IClubFilter,
  IClubSearchFilter,
} from 'src/shared/interfaces/clubs.repository.interface';
import { WhereOptions, Op } from 'sequelize';
import { IClubAttributes } from '../database/models/club.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ClubsRepository implements IClubsRepository {
  constructor(
    @InjectModel(Club)
    private readonly clubModel: typeof Club,
  ) {}

  async create(data: ICreateClubData): Promise<IClubAttributes> {
    const club = await this.clubModel.create(data as CreationAttributes<Club>);
    return club.toJSON();
  }

  async findAll(filter: IClubFilterFindAll): Promise<IClubAttributes[]> {
    return this.clubModel.findAll({
      where: filter as WhereOptions<IClubAttributes>,
    });
  }

  findWithSearchFilter(
    filter: IClubSearchFilter,
  ): Promise<IClubAttributes | null> {
    const where: WhereOptions<IClubAttributes> = {};

    if (filter.search) {
      where.name = { [Op.iLike]: `%${filter.search}%` };
    }
    if (filter.country) {
      where.country = filter.country;
    }
    if (filter.league) {
      where.league = filter.league;
    }

    return this.clubModel.findOne({ where });
  }

  async update(
    data: Partial<IClubAttributes>,
    filter: IClubFilter,
  ): Promise<any> {
    await this.clubModel.update(data, {
      where: filter as WhereOptions<IClubAttributes>,
    });
    const updated = await this.clubModel.findOne({
      where: filter as WhereOptions<IClubAttributes>,
    });

    return updated?.toJSON();
  }

  async delete(filter: IClubFilter): Promise<void> {
    await this.clubModel.destroy({
      where: { id: filter.id },
    });
  }
  async findById(id: number): Promise<IClubAttributes | null> {
    return this.clubModel.findOne({ where: { userId: id } });
  }
  async findByName(filter: IClubSearchByName): Promise<IClubAttributes | null> {
    return this.clubModel.findOne({
      where: filter as WhereOptions<IClubAttributes>,
    });
  }
}
