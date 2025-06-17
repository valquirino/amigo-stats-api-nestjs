import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordrDto {
  @IsString()
  @IsNotEmpty({ message: 'sua senha atual é obrigatoria' })
  currentPassword: string;

  @IsNotEmpty({ message: 'sua Senha nova  é obrigatoria .' })
  newPassword: string;
}
