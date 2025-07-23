import { IsInt, IsPositive } from 'class-validator';

export class CreateLeagueClubConciliationDto {
  @IsInt()
  @IsPositive()
  leagueId: number;

  @IsInt()
  @IsPositive()
  clubId: number;

  @IsInt()
  @IsPositive()
  year: number;
}
