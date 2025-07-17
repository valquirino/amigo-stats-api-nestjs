import { Module } from '@nestjs/common';
import { LeagueClubConciliationsService } from './league-club-conciliations.service';
import { LeagueClubConciliationsController } from './league-club-conciliations.controller';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { League } from 'src/shared/infrastructure/database/models/league.model';
import { LeagueClubConciliation } from 'src/shared/infrastructure/database/models/league-club-conciliations.model';

@Module({
   imports: [DatabaseModule.forFeature([LeagueClubConciliation])],
  controllers: [LeagueClubConciliationsController],
  providers: [LeagueClubConciliationsService],
})
export class LeagueClubConciliationsModule {}
