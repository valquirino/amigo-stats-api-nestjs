import { Injectable } from '@nestjs/common';
import { CreateLeagueClubConciliationDto } from './dto/create-league-club-conciliation.dto';
import { UpdateLeagueClubConciliationDto } from './dto/update-league-club-conciliation.dto';
import { LeagueClubConciliationsRepository } from '../shared/infrastructure/repositories/league-club-conciliations.repository';
import { FilterLeagueClubConciliationDto } from './dto/filter-league-club-conciliation.dto';

@Injectable()
export class LeagueClubConciliationsService {
  constructor(
    private readonly repository: LeagueClubConciliationsRepository,
  ) {}

  create(createDto: CreateLeagueClubConciliationDto) {
    return this.repository.create(createDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne({ id });
  }

  update(id: number, updateDto: UpdateLeagueClubConciliationDto) {
    return this.repository.update(updateDto, id);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  findAllWithFilter(filterLeagueClubConciliationDto:FilterLeagueClubConciliationDto) {
    return this.repository.findManyWithFilter(filterLeagueClubConciliationDto)

  }


}
