import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { League, ILeagueAttributes } from '../database/models/league.model'
import { ILeaguesRepository, ICreateLeagueData, ILeagueFilter, IFindOneFilter } from '../../interfaces/league.repository.interface';
import { CreationAttributes, WhereOptions } from 'sequelize';

@Injectable()
export class LeaguesRepository implements ILeaguesRepository {
  constructor(
    @InjectModel(League)
    private readonly leagueModel: typeof League,
  ) {}

  async create(data: ICreateLeagueData): Promise<ILeagueAttributes> {
    return this.leagueModel.create(data as CreationAttributes<League>);
  }

  async findAll(): Promise<ILeagueAttributes[]> {
    return this.leagueModel.findAll();
  }

  async findById(id: number): Promise<ILeagueAttributes | null> {
    return this.leagueModel.findByPk(id);
  }

  async findOne(filter: IFindOneFilter): Promise<ILeagueAttributes | null> {
    return this.leagueModel.findOne({ where: filter as WhereOptions<ILeagueAttributes> })

  }

  async update(data:Partial<ICreateLeagueData>, filter: ILeagueFilter): Promise<any> {
    return this.leagueModel.update(data, {
      where: { id: filter.id },
    });
  }

  async delete(filter: ILeagueFilter): Promise<any> {
    return this.leagueModel.destroy({
      where: { id: filter.id },
    });
  }
}
