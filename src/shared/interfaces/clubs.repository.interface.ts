import {
  Club,
  IClubAttributes,
} from './../infrastructure/database/models/club.model';

export interface ICreateClubData {
  name: string;
  founded?: number;
  country: string;
  location: string;
  league: string;
  stadium?: string;
  president?: string;
  primaryColor?: string;
  secondaryColor?: string;
  description?: string;
  logo?: string;
  userId: number;
}

export interface IClubFilterFindAll {
  userId: number;
}
export interface IClubFilter {
  id: number;
}
export interface IClubSearchFilter {
  search?: string;
  country?: string;
  league?: string;
}
export interface IClubSearchByName {
  name?: string;
}

export interface IClubsRepository {
  create(data: ICreateClubData): Promise<IClubAttributes>;
  findAll(filter: IClubFilterFindAll): Promise<IClubAttributes[]>;
  delete(filter: IClubFilter): Promise<any>;
  update(data: IClubAttributes, filter: IClubFilter): Promise<any>;
  findById(id: number): Promise<IClubAttributes | null>;
  findByName(filter: IClubSearchByName): Promise<IClubAttributes | null>;
  findAllBySearch(
    filter: IClubSearchFilter & { userId: number },
  ): Promise<Club[]>;
}
