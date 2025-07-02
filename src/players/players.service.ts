import { PlayersRepository } from 'src/shared/infrastructure/repositories/players.repository';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { SearchPlayerFilterDto } from './dto/searchPlayerFilterDto.dto';
import { ActivityRepository } from 'src/shared/infrastructure/repositories/activities.repository';

@Injectable()
export class PlayersService {
  constructor(
    private readonly playersRepository: PlayersRepository,
    private readonly activityRepository: ActivityRepository,
  ) {}

  async create(
    createPlayerDto: CreatePlayerDto,
    userId: number,
    userName: string,
  ) {
    const player = await this.playersRepository.create({
      ...createPlayerDto,
      userId,
    });

    await this.activityRepository.create({
      user: userName,
      actionType: 'create',
      entity: 'player',
      description: `${userName} created a new player.`,
    });

    return player;
  }

  findAll(userId: number) {
    return this.playersRepository.findAllByUser({ userId });
  }
  findOne(id: number) {
    return this.playersRepository.findOne(id);
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto, userName: string) {
    const updated = await this.playersRepository.update(updatePlayerDto, {
      id,
    });

    await this.activityRepository.create({
      user: userName,
      actionType: 'edit',
      entity: 'player',
      description: `${userName} edited player #${id}.`,
    });

    return updated;
  }

  async remove(id: number, userName: string) {
    const player = await this.playersRepository.findOne(id);

    await this.playersRepository.delete({ id });

    await this.activityRepository.create({
      user: userName,
      actionType: 'delete',
      entity: 'player',
      description: `${userName} removed player #${id}.`,
    });

    return player;
  }

  findWithSearchFilter(
    searchPlayerFilterDto: SearchPlayerFilterDto & { userId: number },
  ) {
    return this.playersRepository.findAllBySearch(searchPlayerFilterDto);
  }
}
