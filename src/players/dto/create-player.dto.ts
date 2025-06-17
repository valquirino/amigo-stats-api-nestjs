import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsOptional()
  @IsInt()
  shirtNumber?: number;

  @IsOptional()
  @IsInt()
  height?: number;

  @IsOptional()
  @IsInt()
  weight?: number;

  @IsIn(['Ativo', 'Lesionado', 'Suspenso', 'Aposentado'])
  status: 'Ativo' | 'Lesionado' | 'Suspenso' | 'Aposentado';

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  clubId: number;
}
