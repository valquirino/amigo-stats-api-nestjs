import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { Club } from 'src/shared/infrastructure/database/models/club.model';
import { ClubsRepository } from 'src/shared/infrastructure/repositories/clubs.repository';

@Module({
  imports: [DatabaseModule.forFeature([Club])],
  controllers: [ClubsController],
  providers: [ClubsService, ClubsRepository],
})
export class ClubsModule {}
