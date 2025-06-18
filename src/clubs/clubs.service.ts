import { Injectable, NotFoundException } from '@nestjs/common';
import { ClubsRepository } from './../shared/infrastructure/repositories/clubs.repository';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { SearchFilterDto } from './dto/search-filter.dto';
import { Club } from 'src/shared/infrastructure/database/models/club.model';

@Injectable()
export class ClubsService {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  async create(createClubDto: CreateClubDto, userId: number) {
    const club = await this.clubsRepository.findByName({
      name: createClubDto.name,
    });
    if (club) {
      return { message: 'this club already exists' };
    }
    return await this.clubsRepository.create({
      ...createClubDto,
      userId,
    });
  }

  async findAll(userId: number) {
    return this.clubsRepository.findAll({ userId });
  }

  async findWithSeaarchFilter(filter: SearchFilterDto) {
    const club = await this.clubsRepository.findWithSearchFilter(filter);

    if (!club) {
      throw new NotFoundException(`Clube nao encontrado.`);
    }

    return club;
  }

  async update(id: number, updateClubDto: UpdateClubDto) {
    await this.findById(id);

    await this.clubsRepository.update(updateClubDto, {
      id,
    });
  }

  async remove(id: number) {
    const club = await this.clubsRepository.findById(id);

    if (!club || club.id !== id) {
      throw new NotFoundException(
        `Clube com id ${id} não encontrado para remoção.`,
      );
    }
    await this.clubsRepository.delete({ id });
    return { message: `Clube com id ${id} removido com sucesso.` };
  }

  async findById(id: number) {
    const club = await this.clubsRepository.findById(id);

    if (!club) {
      throw new NotFoundException(
        `Clube com id ${id} não encontrado para atualização.`,
      );
    }

    return club;
  }

  async listWithSearchFilter(searchFilterDto: SearchFilterDto, userId: number) {
    return await this.clubsRepository.findAllBySearch({
      ...searchFilterDto,
      userId,
    });
  }
}
