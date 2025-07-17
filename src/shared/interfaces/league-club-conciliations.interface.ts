import { ILeagueClubConciliationAttributes } from '../infrastructure/database/models/league-club-conciliations.model';

export interface ICreateLeagueClubConciliationData {
  leagueId: number;
  clubId: number;
  year: number;
}

export type IFilterLeagueClubConciliationData =
  Partial<ICreateLeagueClubConciliationData>;

export interface ILeagueClubConciliationsRepository {
  create(
    data: ICreateLeagueClubConciliationData,
  ): Promise<ILeagueClubConciliationAttributes>;
  
  findAll(): Promise<ILeagueClubConciliationAttributes[]>;

  findOne(
    filter: IFilterLeagueClubConciliationData,
  ): Promise<ILeagueClubConciliationAttributes | null>;

  update(data: ILeagueClubConciliationAttributes, id: number): Promise<any>;

  delete(id: number): Promise<any>;

  findManyWithFilter(
    filter: IFilterLeagueClubConciliationData,
  ): Promise<ILeagueClubConciliationAttributes[]>;
}
