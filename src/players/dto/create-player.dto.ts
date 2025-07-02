import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Carlos Silva', description: 'Nome completo do jogador' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123.456.789-00', description: 'CPF do jogador' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiPropertyOptional({ example: 'Carlão', description: 'Apelido do jogador' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ example: '1995-08-15', description: 'Data de nascimento (formato ISO)' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ example: 'Brasileiro', description: 'Nacionalidade do jogador' })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({ example: 'Atacante', description: 'Posição do jogador' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiPropertyOptional({ example: 9, description: 'Número da camisa' })
  @IsOptional()
  @IsInt()
  shirtNumber?: number;

  @ApiPropertyOptional({ example: 180, description: 'Altura em centímetros' })
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiPropertyOptional({ example: 75, description: 'Peso em kg' })
  @IsOptional()
  @IsInt()
  weight?: number;

  @ApiProperty({
    example: 'Ativo',
    description: 'Status do jogador',
    enum: ['Ativo', 'Lesionado', 'Suspenso', 'Aposentado'],
  })
  @IsIn(['Ativo', 'Lesionado', 'Suspenso', 'Aposentado'])
  status: 'Ativo' | 'Lesionado' | 'Suspenso' | 'Aposentado';

  @ApiPropertyOptional({ example: 'Volta de lesão recente', description: 'Observações adicionais' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 1, description: 'ID do clube ao qual o jogador pertence' })
  @IsInt()
  clubId: number;
}
