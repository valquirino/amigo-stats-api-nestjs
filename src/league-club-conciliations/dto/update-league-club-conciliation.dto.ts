import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateLeagueClubConciliationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  leagueId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  clubId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  year?: number;
}
