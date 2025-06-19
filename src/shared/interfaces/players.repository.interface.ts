import { IPlayerAttributes } from './../infrastructure/database/models/player.model';
import { Player } from './../infrastructure/database/models/player.model';
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
}

export interface IPlayerSearchFilter extends IPlayerUserId {
  search?: string;
  position?: string;
  clubId?: number;
}
export interface IPlayerId {
  id: number;
}

export interface IPlayersRepository {
  create(data: ICreatePlayerData): Promise<IPlayerAttributes>;
  update(data: Partial<ICreatePlayerData>, filter: IPlayerId): Promise<any>;
  delete(filter: IPlayerId): Promise<any>;
  findAllByUser(filter: IPlayerUserId): Promise<IPlayerAttributes[] | null>;
  findAllBySearch(
    filter?: IPlayerSearchFilter,
  ): Promise<IPlayerAttributes[] | null>;
  findOne(id: number): Promise<Player | null>;
}
