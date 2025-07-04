import { IsString, IsEmail, MinLength, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;

  @ApiProperty({ example: 'admin', description: 'Papel ou função do usuário no sistema' })
  @IsString()
  @IsNotEmpty({ message: 'O papel é obrigatório.' })
  role:string;

    @IsIn(['pending', 'approved','rejected'])
    permission:'pending' | 'approved'| 'rejected';
}
