import { PlayersRepository } from 'src/shared/infrastructure/repositories/players.repository';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

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
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
