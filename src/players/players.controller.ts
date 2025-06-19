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

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(
      createPlayerDto,
      this.request.user.userId,
    );
  }

  @Post('filter')
  listWithFilter(@Body() searchPlayerFilterDto: SearchPlayerFilterDto) {
    return this.playersService.findWithSearchFilter({
      ...searchPlayerFilterDto,
      userId: this.request.user.userId,
    });
  }

  @Get('list')
  findAll() {
    return this.playersService.findAll(this.request.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
