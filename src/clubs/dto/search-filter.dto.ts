import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchFilterDto {
  @ApiPropertyOptional({ example: 'Real', description: 'Texto para busca por nome' })
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({ example: 'Espanha', description: 'Filtro por país' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 'La Liga', description: 'Filtro por liga' })
  @IsOptional()
  @IsString()
  league?: string;
}

