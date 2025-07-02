import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty({ example: 'Flamengo', description: 'Nome do clube' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 1895, description: 'Ano de fundação do clube' })
  @IsOptional()
  @IsInt()
  founded?: number;

  @ApiProperty({ example: 'Brasil', description: 'País do clube' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'Rio de Janeiro', description: 'Cidade ou localidade do clube' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Brasileirão Série A', description: 'Liga em que o clube participa' })
  @IsString()
  @IsNotEmpty()
  league: string;

  @ApiPropertyOptional({ example: 'Maracanã', description: 'Estádio principal do clube' })
  @IsOptional()
  @IsString()
  stadium?: string;

  @ApiPropertyOptional({ example: 'Rodolfo Landim', description: 'Presidente do clube' })
  @IsOptional()
  @IsString()
  president?: string;

  @ApiPropertyOptional({ example: 'Vermelho', description: 'Cor primária do clube' })
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @ApiPropertyOptional({ example: 'Preto', description: 'Cor secundária do clube' })
  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @ApiPropertyOptional({ example: 'Maior clube do Brasil.', description: 'Descrição adicional sobre o clube' })
  @IsOptional()
  @IsString()
  description?: string;
}
