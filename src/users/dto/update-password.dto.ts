import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordrDto {
  @ApiProperty({ example: 'senhaAntiga123', description: 'Senha atual do usuário' })
  @IsString()
  @IsNotEmpty({ message: 'Sua senha atual é obrigatória' })
  currentPassword: string;

  @ApiProperty({ example: 'novaSenha456', description: 'Nova senha que será definida' })
  @IsNotEmpty({ message: 'Sua nova senha é obrigatória.' })
  newPassword: string;
}
