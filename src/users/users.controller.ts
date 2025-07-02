import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/shared/infrastructure/decorators/public.decorator';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import { UpdatePasswordrDto } from './dto/update-password.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Put('update-profile')
  @ApiOperation({ summary: 'Atualiza os dados do perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: UpdateUserDto })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(
      this.request.user.userId,
      updateUserDto,
      this.request.user.name,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove o usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  remove() {
    return this.usersService.remove(this.request.user.userId);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário retornado com sucesso' })
  getProfile() {
    return this.usersService.renderProfile(this.request.user.userId);
  }

  @Put('update-password')
  @ApiOperation({ summary: 'Atualiza a senha do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar a senha' })
  @ApiBody({ type: UpdatePasswordrDto })
  updatePassword(@Body() updateUserPassword: UpdatePasswordrDto) {
    return this.usersService.updatePassword(
      this.request.user.userId,
      updateUserPassword,
    );
  }
}
