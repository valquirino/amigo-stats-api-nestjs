import { PlayersRepository } from 'src/shared/infrastructure/repositories/players.repository';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { SearchPlayerFilterDto } from './dto/searchPlayerFilterDto.dto';

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  create(createPlayerDto: CreatePlayerDto, userId: number) {
    return this.playersRepository.create({
      ...createPlayerDto,
      userId,
    });
  }

  findAll(userId: number) {
    return this.playersRepository.findAllByUser({ userId });
  }
  findOne(id: number) {
    return this.playersRepository.findOne(id);
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.playersRepository.update(updatePlayerDto, { id });
  }

  remove(id: number) {
    return this.playersRepository.delete({ id });
  }

  findWithSearchFilter(
    searchPlayerFilterDto: SearchPlayerFilterDto & { userId: number },
  ) {
    return this.playersRepository.findAllBySearch(searchPlayerFilterDto);
  }
}
