import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Player } from '../database/models/player.model';
import {
  ICreatePlayerData,
  IPlayerId,
  IPlayerSearchFilter,
  IPlayerUserId,
  IPlayersRepository,
} from '../../interfaces/players.repository.interface';
import { IPlayerAttributes } from '../database/models/player.model';
import { WhereOptions, Op } from 'sequelize';
import { Club } from '../database/models/club.model';

@Injectable()
export class PlayersRepository implements IPlayersRepository {
  constructor(
    @InjectModel(Player)
    private readonly playerModel: typeof Player,

    @InjectModel(Club)
    private readonly clubModel: typeof Club,
  ) {}

  async create(data: ICreatePlayerData): Promise<IPlayerAttributes> {
    return this.playerModel.create(data as any);
  }

  async update(
    data: Partial<ICreatePlayerData>,
    filter: IPlayerId,
  ): Promise<void> {
    const parsedData: Partial<IPlayerAttributes> = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    };

    await this.playerModel.update(parsedData, {
      where: filter as WhereOptions<IPlayerAttributes>,
    });
  }

  async delete(filter: IPlayerId): Promise<any> {
    return await this.playerModel.destroy({
      where: {
        id: filter.id,
      },
    });
  }

  async findAllByUser(
    filter: IPlayerUserId,
  ): Promise<IPlayerAttributes[] | null> {
    return await this.playerModel.findAll({
      where: filter as WhereOptions<IPlayerAttributes>,
      include: [
        {
          model: Club,
          as: 'club',
        },
      ],
    });
  }

  async findAllBySearch(filter: IPlayerSearchFilter): Promise<Player[]> {
    const { search, position, clubId, userId } = filter;

    const where: WhereOptions<IPlayerAttributes> = { userId };

    if (position) {
      where.position = { [Op.iLike]: `%${position}%` };
    }

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    if (clubId) {
      where.clubId = clubId;
    }

    return await this.playerModel.findAll({
      where,
      include: [{ model: Club, as: 'club' }],
    });
  }

  async findOne(id: number): Promise<Player | null> {
    return this.playerModel.findOne({
      where: { id } as WhereOptions<IPlayerAttributes>,
    });
  }
}
