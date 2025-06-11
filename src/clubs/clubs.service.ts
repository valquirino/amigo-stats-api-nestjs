import { Injectable, NotFoundException } from '@nestjs/common';
import { ClubsRepository } from './../shared/infrastructure/repositories/clubs.repository';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  async create(createClubDto: CreateClubDto) {
    return this.clubsRepository.create(createClubDto);
  }

  async findAll(userId: number) {
    return this.clubsRepository.findAll({ userId });
  }

  async findWithSeaarchFilter(id: number) {
    const club = await this.clubsRepository.findWithSearchFilter({
      search: undefined,
      country: undefined,
      league: undefined,
    });

    if (!club) {
      throw new NotFoundException(`Clube nao encontrado.`);
    }

    return club;
  }

  async update(id: number, updateClubDto: UpdateClubDto) {
    const updatedClub = await this.clubsRepository.update(updateClubDto, {
      id,
    });
    if (!updatedClub) {
      throw new NotFoundException(
        `Clube com id ${id} não encontrado para atualização.`,
      );
    }
    return updatedClub;
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
  async findById(id: number) {}
}
