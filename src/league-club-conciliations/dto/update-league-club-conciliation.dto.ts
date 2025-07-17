import { PartialType } from '@nestjs/swagger';
import { CreateLeagueClubConciliationDto } from './create-league-club-conciliation.dto';

export class UpdateLeagueClubConciliationDto extends PartialType(CreateLeagueClubConciliationDto) {}
