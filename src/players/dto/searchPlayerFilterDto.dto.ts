import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPlayerFilterDto {
  @ApiPropertyOptional({ example: 'Carlos', description: 'Busca por nome ou apelido' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'Zagueiro', description: 'Filtrar por posição' })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional({ example: 2, description: 'Filtrar por ID do clube' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  clubId?: number;
}
