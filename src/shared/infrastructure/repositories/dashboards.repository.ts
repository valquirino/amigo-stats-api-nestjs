import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import {
  IDashboardRepository,
  IUserId,
} from 'src/shared/interfaces/dashboard.repository.interface';
import { Club } from '../database/models/club.model';
import { Player } from '../database/models/player.model';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(
    @InjectModel(Club)
    private readonly clubModel: typeof Club,

    @InjectModel(Player)
    private readonly playerModel: typeof Player,
  ) {}

  async getLatest({ userId }: IUserId) {
    const clubs = await this.clubModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    const players = await this.playerModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
    console.log({
      clubs,
      players,
    });

    return { clubs, players };
  }

  async getCounts({ userId }: IUserId) {
    const clubsCount = await this.clubModel.count({ where: { userId } });
    const playersCount = await this.playerModel.count({ where: { userId } });
    const playerActiveCount = await this.playerModel.count({
      where: {
        userId,
        status: 'Ativo',
      },
    });

    console.log({
      clubs: clubsCount,
      players: playersCount,
      activePlayers: playerActiveCount,
    });
    return {
      clubs: clubsCount,
      players: playersCount,
      activePlayers: playerActiveCount,
    };
  }
}
