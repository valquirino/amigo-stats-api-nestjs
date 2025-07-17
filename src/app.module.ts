import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { ClubsModule } from './clubs/clubs.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { ActivityModule } from './activities/activities.module';
import { LeaguesModule } from './leagues/leagues.module';
import { LeagueClubConciliationsModule } from './league-club-conciliations/league-club-conciliations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PlayersModule,
    ClubsModule,
    DashboardModule,
    ActivityModule,
    LeaguesModule,
    LeagueClubConciliationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
