import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LeagueClubConciliation } from '../database/models/league-club-conciliations.model';
import {
  ILeagueClubConciliationsRepository,
  ICreateLeagueClubConciliationData,
  IFilterLeagueClubConciliationData,
} from 'src/shared/interfaces/league-club-conciliations.interface';
import { ILeagueClubConciliationAttributes } from '../database/models/league-club-conciliations.model';

@Injectable()
export class LeagueClubConciliationsRepository
  implements ILeagueClubConciliationsRepository
{
  constructor(
    @InjectModel(LeagueClubConciliation)
    private readonly conciliationModel: typeof LeagueClubConciliation,
  ) {}

  async create(data: ICreateLeagueClubConciliationData): Promise<ILeagueClubConciliationAttributes> {
    return this.conciliationModel.create(data);
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
    return this.conciliationModel.findAll({ where: filter });
  }

  async update(data: ILeagueClubConciliationAttributes, id: number): Promise<any> {
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
