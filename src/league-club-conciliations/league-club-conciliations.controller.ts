import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LeagueClubConciliationsService } from './league-club-conciliations.service';
import { CreateLeagueClubConciliationDto } from './dto/create-league-club-conciliation.dto';
import { UpdateLeagueClubConciliationDto } from './dto/update-league-club-conciliation.dto';
import { FilterLeagueClubConciliationDto } from './dto/filter-league-club-conciliation.dto';

@Controller('league-club-conciliations')
export class LeagueClubConciliationsController {
  constructor(private readonly leagueClubConciliationsService: LeagueClubConciliationsService) {}

  @Post()
  create(@Body() createLeagueClubConciliationDto: CreateLeagueClubConciliationDto) {
    console.log
    return this.leagueClubConciliationsService.create(createLeagueClubConciliationDto);
  }

  @Get()
  findAll() {
    return this.leagueClubConciliationsService.findAll();
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueClubConciliationDto: UpdateLeagueClubConciliationDto) {
    return this.leagueClubConciliationsService.update(+id, updateLeagueClubConciliationDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueClubConciliationsService.remove(+id);
  }
  
  @Get('/filter') 
  findWithFilter(@Query() filterLeagueClubConciliationDto:FilterLeagueClubConciliationDto){
    console.log('teste')
    return this.leagueClubConciliationsService.findAllWithFilter(filterLeagueClubConciliationDto)
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.leagueClubConciliationsService.findOne(+id);
  }
}
 