import { Injectable } from '@nestjs/common';
import { CreateLeagueClubConciliationDto } from './dto/create-league-club-conciliation.dto';
import { UpdateLeagueClubConciliationDto } from './dto/update-league-club-conciliation.dto';

@Injectable()
export class LeagueClubConciliationsService {
  create(createLeagueClubConciliationDto: CreateLeagueClubConciliationDto) {
    return 'This action adds a new leagueClubConciliation';
  }

  findAll() {
    return `This action returns all leagueClubConciliations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leagueClubConciliation`;
  }

  update(id: number, updateLeagueClubConciliationDto: UpdateLeagueClubConciliationDto) {
    return `This action updates a #${id} leagueClubConciliation`;
  }

  remove(id: number) {
    return `This action removes a #${id} leagueClubConciliation`;
  }
}
