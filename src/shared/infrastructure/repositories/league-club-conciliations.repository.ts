import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LeagueClubConciliation } from '../database/models/league-club-conciliations.model';
import {
  ILeagueClubConciliationsRepository,
  ICreateLeagueClubConciliationData,
  IFilterLeagueClubConciliationData,
} from 'src/shared/interfaces/league-club-conciliations.interface';
import { ILeagueClubConciliationAttributes } from '../database/models/league-club-conciliations.model';
import { Club } from '../database/models/club.model';
import { League } from '../database/models/league.model';

import { Includeable, WhereOptions } from 'sequelize';

@Injectable()
export class LeagueClubConciliationsRepository
  implements ILeagueClubConciliationsRepository
{
  constructor(
    @InjectModel(LeagueClubConciliation)
    private readonly conciliationModel: typeof LeagueClubConciliation,
  ) {}

  async create(data: ICreateLeagueClubConciliationData): Promise<ILeagueClubConciliationAttributes> {
    return this.conciliationModel.create(data as any);
  }

  async findAll(): Promise<ILeagueClubConciliationAttributes[]> {
    return this.conciliationModel.findAll();
  }

  async findOne(filter: IFilterLeagueClubConciliationData): Promise<ILeagueClubConciliationAttributes | null> {
    return this.conciliationModel.findOne({ where: filter });
  }
  async findManyWithFilter(
    filter: IFilterLeagueClubConciliationData,
  ): Promise<ILeagueClubConciliationAttributes[]> {
    
    const { clubId, leagueId, year } = filter;
  
    const where: WhereOptions = {};
    if (year) {
      where['year'] = year;
    }

    if (clubId) {
      where.club_id = clubId
    }

    if (leagueId) {
      where.league_id = leagueId
    }

  
    return this.conciliationModel.findAll({
      where,
    });
  }

  async update(data: Partial<ILeagueClubConciliationAttributes>, id: number): Promise<any> {
    return this.conciliationModel.update(data, {
      where: { id },
    });
  }

  async delete(id: number): Promise<any> {
    return this.conciliationModel.destroy({
      where: { id },
    });
  }
}
