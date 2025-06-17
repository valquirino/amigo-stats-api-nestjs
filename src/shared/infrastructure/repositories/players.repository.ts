import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Player } from '../database/models/player.model';
import {
  ICreatePlayerData,
  IPlayerSearchFilter,
  IPlayerUserId,
  IPlayersRepository,
} from '../../interfaces/players.repository.interface';
import { IPlayerAttributes } from '../database/models/player.model';
import { WhereOptions, Op } from 'sequelize';

@Injectable()
export class PlayersRepository implements IPlayersRepository {
  constructor(
    @InjectModel(Player)
    private readonly playerModel: typeof Player,
  ) {}

  async create(data: ICreatePlayerData): Promise<IPlayerAttributes> {
    return this.playerModel.create(data as any);
  }

  async update(
    data: Partial<ICreatePlayerData>,
    filter: IPlayerUserId,
  ): Promise<void> {
    const parsedData: Partial<IPlayerAttributes> = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    };

    await this.playerModel.update(parsedData, {
      where: filter as WhereOptions<IPlayerAttributes>,
    });
  }

  async delete(filter: IPlayerUserId): Promise<any> {
    return await this.playerModel.destroy({
      where: {
        userId: filter.userId,
      },
    });
  }

  async findAllByUser(
    filter: IPlayerUserId,
  ): Promise<IPlayerAttributes[] | null> {
    return await this.playerModel.findAll({
      where: filter as WhereOptions<IPlayerAttributes>,
    });
  }

  async findAllBySearch(
    filter: IPlayerSearchFilter,
  ): Promise<IPlayerAttributes[] | null> {
    const where: WhereOptions<IPlayerAttributes> = {};

    if (filter.position) {
      where.position = { [Op.iLike]: `%${filter.position}%` };
    }
    if (filter.clubId) {
      where.$clubId$ = filter.clubId;
    }
    if (filter.search) {
      where.name = filter.search;
    }

    return this.playerModel.findOne({ where }) as Promise<
      IPlayerAttributes[] | null
    >;
  }
}
