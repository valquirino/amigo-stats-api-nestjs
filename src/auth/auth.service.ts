import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ITokenPayload } from 'src/shared/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    if(user.permission!== 'approved') {
      throw new ForbiddenException('Sua conta ainda não foi aprovada,para isso solicite acesso no botao abaixo ');
    }

    const payload: ITokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role:user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: payload,
    };
 
  }
}
