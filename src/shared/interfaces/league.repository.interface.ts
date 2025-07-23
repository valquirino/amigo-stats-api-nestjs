import { ILeagueAttributes } from "../infrastructure/database/models/league.model";  

export interface ICreateLeagueData {
  name: string;
  teamsCount: number;
  gamesCount: number;
}

export interface ILeagueFilter {
  id: number;
}

export interface IFindOneFilter {
    name :string;
}

export interface ILeaguesRepository {
  create(data: ICreateLeagueData): Promise<ILeagueAttributes>;
  findAll(): Promise<ILeagueAttributes[]>;
  findById(id: number): Promise<ILeagueAttributes | null>;
  update(data: Partial<ICreateLeagueData>, filter: ILeagueFilter): Promise<any>;
  delete(filter: ILeagueFilter): Promise<any>;
  findOne(filter:IFindOneFilter):Promise<ILeagueAttributes |null>;
}

 