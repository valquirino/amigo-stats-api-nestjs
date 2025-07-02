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
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import { SearchFilterDto } from './dto/search-filter.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('clubs')
@Controller('clubs')
export class ClubsController {
  constructor(
    private readonly clubsService: ClubsService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo clube' })
  @ApiResponse({ status: 201, description: 'Clube criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: CreateClubDto })
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(
      createClubDto,
      this.request.user.userId,
      this.request.user.name,
    );
  }

  @Get('list')
  @ApiOperation({ summary: 'Listar todos os clubes do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de clubes retornada com sucesso' })
  findAll() {
    return this.clubsService.findAll(this.request.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar clube por ID' })
  @ApiResponse({ status: 200, description: 'Clube encontrado' })
  @ApiResponse({ status: 404, description: 'Clube não encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do clube' })
  findById(@Param('id') id: string) {
    return this.clubsService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar clube por ID' })
  @ApiResponse({ status: 200, description: 'Clube atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Clube não encontrado' })
  @ApiBody({ type: UpdateClubDto })
  @ApiParam({ name: 'id', type: Number, description: 'ID do clube' })
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(+id, updateClubDto, this.request.user.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover clube por ID' })
  @ApiResponse({ status: 200, description: 'Clube removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Clube não encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do clube' })
  remove(@Param('id') id: string) {
    return this.clubsService.remove(+id, this.request.user.name);
  }

  @Post('filter')
  @ApiOperation({ summary: 'Filtrar clubes com base nos critérios de busca' })
  @ApiResponse({ status: 200, description: 'Lista filtrada de clubes' })
  @ApiBody({ type: SearchFilterDto })
  listClubsWithSearchFilters(@Body() searchFilterdto: SearchFilterDto) {
    return this.clubsService.listWithSearchFilter(
      searchFilterdto,
      this.request.user.userId,
    );
  }
}
