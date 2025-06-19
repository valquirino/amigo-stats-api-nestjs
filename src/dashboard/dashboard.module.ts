import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { Club } from 'src/shared/infrastructure/database/models/club.model';
import { Player } from 'src/shared/infrastructure/database/models/player.model';

@Module({
  imports: [DatabaseModule.forFeature([Club, Player])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
