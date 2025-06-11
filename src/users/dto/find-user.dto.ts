import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindUserDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
