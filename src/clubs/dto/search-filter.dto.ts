import { IsOptional, IsString } from 'class-validator';

export class SearchFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  league?: string;
}
