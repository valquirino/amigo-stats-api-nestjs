import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ITokenPayload } from 'src/shared/interfaces/token-payload.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
      throw new ForbiddenException('Sua conta ainda não foi aprovada ');
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

  async registerUserWIthAcess(dto: CreateUserDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (user) {
      throw new UnauthorizedException('Usuário já existe e esta a esperando pela permissao dos admins');
    }

    this.usersService.create(dto)

  }
}
