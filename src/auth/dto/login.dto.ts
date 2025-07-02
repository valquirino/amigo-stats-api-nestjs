import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Endereço de e-mail do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'minhaSenhaSegura123',
    description: 'Senha de acesso do usuário',
  })
  @IsString()
  password: string;
}
