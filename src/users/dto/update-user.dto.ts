import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Maria Oliveira', description: 'Nome atualizado do usuário' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({ example: 'maria@email.com', description: 'Novo e-mail do usuário' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @ApiProperty({ example: true, description: 'Status de verificação do usuário', required: false })
  @IsOptional()
  @IsBoolean({ message: 'O status de verificação deve ser um valor booleano.' })
  isChecked?: boolean;

  @IsIn(['admin','user',])
  role: string
}
