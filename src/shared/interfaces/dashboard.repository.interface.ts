export interface IUserId {
  userId: number;
}

export interface IDashboardRepository {
  getLatest(filter: IUserId): Promise<{ clubs: any[]; players: any[] }>;
  getCounts(
    filter: IUserId,
  ): Promise<{ clubs: number; players: number; activePlayers: number }>;
}
