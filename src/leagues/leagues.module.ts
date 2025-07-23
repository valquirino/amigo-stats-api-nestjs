import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { League } from 'src/shared/infrastructure/database/models/league.model';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { LeaguesRepository } from 'src/shared/infrastructure/repositories/leagues.repository';

@Module({
  imports: [DatabaseModule.forFeature([League])],
  controllers: [LeaguesController],
  providers: [LeaguesService,LeaguesRepository],
})
export class LeaguesModule {}
