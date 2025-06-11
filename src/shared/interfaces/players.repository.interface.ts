import { IPlayerAttributes } from './../infrastructure/database/models/player.model';

export interface ICreatePlayerData {
  name: string;
  cpf: string;
  nickname?: string;
  birthDate: string;
  nationality: string;
  position: string;
  shirtNumber?: number;
  height?: number;
  weight?: number;
  status: 'Ativo' | 'Lesionado' | 'Suspenso' | 'Aposentado';
  notes?: string;
  userId: number;
  clubId: number;
}

export interface IPlayerUserId {
  userId: number;
  id: number;
}

export interface IPlayersRepository {
  create(data: ICreatePlayerData): Promise<IPlayerAttributes>;
  update(data: Partial<ICreatePlayerData>, filter: IPlayerUserId): Promise<any>;
  delete(filter: IPlayerUserId): Promise<any>;
  findAll(): Promise<IPlayerAttributes[] | null>;
}
