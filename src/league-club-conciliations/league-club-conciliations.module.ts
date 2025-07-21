import { Module } from '@nestjs/common';
import { LeagueClubConciliationsService } from './league-club-conciliations.service';
import { LeagueClubConciliationsController } from './league-club-conciliations.controller';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { League } from 'src/shared/infrastructure/database/models/league.model';
import { LeagueClubConciliation } from 'src/shared/infrastructure/database/models/league-club-conciliations.model';
import { LeagueClubConciliationsRepository } from 'src/shared/infrastructure/repositories/league-club-conciliations.repository';

@Module({
   imports: [DatabaseModule.forFeature([LeagueClubConciliation])],
  controllers: [LeagueClubConciliationsController],
  providers: [LeagueClubConciliationsService,LeagueClubConciliationsRepository],
})
export class LeagueClubConciliationsModule {}
