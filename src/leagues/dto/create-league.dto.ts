import { IsString, IsInt, Min, MaxLength } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsInt()
  @Min(1)
  teamsCount: number;

  @IsInt()
  @Min(1)
  gamesCount: number;
}
