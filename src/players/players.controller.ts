import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import { SearchPlayerFilterDto } from './dto/searchPlayerFilterDto.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo jogador' })
  @ApiResponse({ status: 201, description: 'Jogador criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos' })
  @ApiBody({ type: CreatePlayerDto })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(
      createPlayerDto,
      this.request.user.userId,
      this.request.user.name,
    );
  }

  @Post('filter')
  @ApiOperation({ summary: 'Listar jogadores com filtro' })
  @ApiResponse({ status: 200, description: 'Lista de jogadores filtrada' })
  @ApiBody({ type: SearchPlayerFilterDto })
  listWithFilter(@Body() searchPlayerFilterDto: SearchPlayerFilterDto) {
    return this.playersService.findWithSearchFilter({
      ...searchPlayerFilterDto,
      userId: this.request.user.userId,
    });
  }

  @Get('list')
  @ApiOperation({ summary: 'Listar todos os jogadores do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de jogadores retornada com sucesso' })
  findAll() {
    return this.playersService.findAll(this.request.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar jogador por ID' })
  @ApiResponse({ status: 200, description: 'Jogador encontrado' })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do jogador' })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar jogador por ID' })
  @ApiResponse({ status: 200, description: 'Jogador atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiParam({ name: 'id', type: Number, description: 'ID do jogador' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(
      +id,
      updatePlayerDto,
      this.request.user.name,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover jogador por ID' })
  @ApiResponse({ status: 200, description: 'Jogador removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do jogador' })
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id, this.request.user.name);
  }
}
