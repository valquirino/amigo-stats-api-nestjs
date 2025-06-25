import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/shared/infrastructure/repositories/users.repository';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { User } from 'src/shared/infrastructure/database/models/user.model';
import { ActivityModule } from 'src/activities/activities.module';

@Module({
  imports: [DatabaseModule.forFeature([User]), ActivityModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
