import { IsInt, IsOptional, IsPositive } from "class-validator";
import { Transform } from "class-transformer";

export class FilterLeagueClubConciliationDto {
  @IsOptional()
  @Transform(({ value }) => value === "" ? undefined : parseInt(value, 10))
  @IsInt()
  @IsPositive()
  leagueId?: number;

  @IsOptional()
  @Transform(({ value }) => value === "" ? undefined : parseInt(value, 10))
  @IsInt()
  @IsPositive()
  clubId?: number;

  @IsOptional()
  @Transform(({ value }) => value === "" ? undefined : parseInt(value, 10))
  @IsInt()
  @IsPositive()
  year?: number;
}
