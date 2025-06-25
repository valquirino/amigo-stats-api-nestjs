import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayersRepository } from 'src/shared/infrastructure/repositories/players.repository';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { Player } from 'src/shared/infrastructure/database/models/player.model';
import { Club } from 'src/shared/infrastructure/database/models/club.model';
import { ActivityModule } from 'src/activities/activities.module';

@Module({
  imports: [DatabaseModule.forFeature([Player, Club]), ActivityModule],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
