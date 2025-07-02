import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @Type(() => Number)
  @IsNumber()
  id: number;
}
