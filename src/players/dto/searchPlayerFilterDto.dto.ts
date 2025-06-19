import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchPlayerFilterDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  clubId?: number;
}
