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

@Controller('clubs')
export class ClubsController {
  constructor(
    private readonly clubsService: ClubsService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(
      createClubDto,
      this.request.user.userId,
      this.request.user.name,
    );
  }

  @Get('list')
  findAll() {
    return this.clubsService.findAll(this.request.user.userId);
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.clubsService.findById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(+id, updateClubDto, this.request.user.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.remove(+id, this.request.user.name);
  }

  @Post('filter')
  listClubsWithSearchFilters(@Body() searchFilterdto: SearchFilterDto) {
    return this.clubsService.listWithSearchFilter(
      searchFilterdto,
      this.request.user.userId,
    );
  }
}
