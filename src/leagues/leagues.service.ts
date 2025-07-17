import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { LeaguesRepository } from 'src/shared/infrastructure/repositories/leagues.repository';

@Injectable()
export class LeaguesService {
  constructor(private readonly leaguesRepository: LeaguesRepository) {}

  async create(createLeagueDto: CreateLeagueDto) {
    return this.leaguesRepository.create(createLeagueDto);
  }

  async findAll() {
    return this.leaguesRepository.findAll();
  }

  async findById(id: number) {
    const league = await this.leaguesRepository.findById(id);

    if (!league) {
      throw new NotFoundException(`Liga com ID ${id} não encontrada`);
    }

    return league;
  }

  async findOne(name: string) {
    const league = await this.leaguesRepository.findOne({ name });

    if (!league) {
      throw new NotFoundException(`Liga com nome "${name}" não encontrada`);
    }

    return league;
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    const league = await this.leaguesRepository.findById(id);

    if (!league) {
      throw new NotFoundException(`Liga com ID ${id} não encontrada`);
    }

    await this.leaguesRepository.update(updateLeagueDto, { id });
  }

  async remove(id: number) {
    const league = await this.leaguesRepository.findById(id);

    if (!league) {
      throw new NotFoundException(`Liga com ID ${id} não encontrada`);
    }

    await this.leaguesRepository.delete({ id });
  }
}
