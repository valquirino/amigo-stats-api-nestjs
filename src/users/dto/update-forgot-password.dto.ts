import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatForgotPasswordrDto {
  @IsString()
  @IsNotEmpty({ message: 'Sua senha atual é obrigatória' })
  temporaryPassword: string;
}
