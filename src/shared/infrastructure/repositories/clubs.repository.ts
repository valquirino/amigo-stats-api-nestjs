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
import { Player } from '../database/models/player.model';

@Injectable()
export class ClubsRepository implements IClubsRepository {
  constructor(
    @InjectModel(Club)
    private readonly clubModel: typeof Club,
    @InjectModel(Player)
    private readonly playerModel: typeof Player,
  ) {}

  async create(data: ICreateClubData): Promise<IClubAttributes> {
    const club = await this.clubModel.create(data as CreationAttributes<Club>);
    return club.toJSON();
  }

  async findAll(filter: IClubFilterFindAll): Promise<IClubAttributes[]> {
    return this.clubModel.findAll({
      where: filter as WhereOptions<IClubAttributes>,
      include: [{ model: Player, as: 'players' }],
    });
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
    return this.clubModel.findOne({ where: { id: id } });
  }
  async findByName(filter: IClubSearchByName): Promise<IClubAttributes | null> {
    return this.clubModel.findOne({
      where: filter as WhereOptions<IClubAttributes>,
    });
  }

  async findAllBySearch(
    filter: IClubSearchFilter & { userId: number },
  ): Promise<Club[]> {
    const { userId, country, league, search } = filter;

    const where: WhereOptions<IClubAttributes> = { userId };

    if (country) {
      where.country = { [Op.iLike]: `%${country}%` };
    }

    if (league) {
      where.league = league;
    }

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    return this.clubModel.findAll({
      where,
      include: [{ model: Player, as: 'players' }],
    });
  }
}
