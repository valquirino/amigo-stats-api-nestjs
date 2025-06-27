import { Injectable, NotFoundException } from '@nestjs/common';
import { ClubsRepository } from './../shared/infrastructure/repositories/clubs.repository';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { SearchFilterDto } from './dto/search-filter.dto';
import { ActivityRepository } from 'src/shared/infrastructure/repositories/activities.repository';

@Injectable()
export class ClubsService {
  constructor(
    private readonly clubsRepository: ClubsRepository,
    private readonly activityRepository: ActivityRepository,
  ) {}

  async create(createClubDto: CreateClubDto, userId: number, userName: string) {
    const club = await this.clubsRepository.findByName({
      name: createClubDto.name,
    });

    if (club) {
      return { message: 'this club already exists' };
    }

    const created = await this.clubsRepository.create({
      ...createClubDto,
      userId,
    });

    await this.activityRepository.create({
      user: userName,
      actionType: 'create',
      entity: 'club',
      description: `${userName} created the club "${createClubDto.name}".`,
    });

    return created;
  }

  async findAll(userId: number) {
    return this.clubsRepository.findAll({ userId });
  }

  async update(id: number, updateClubDto: UpdateClubDto, userName: string) {
    const club = await this.findById(id);

    await this.clubsRepository.update(updateClubDto, { id });

    await this.activityRepository.create({
      user: userName,
      actionType: 'edit',
      entity: 'club',
      description: `${userName} edited the club "${club.name}".`,
    });
  }

  async remove(id: number, userName: string) {
    const club = await this.clubsRepository.findById(id);

    if (!club || club.id !== id) {
      throw new NotFoundException(
        `Clube com id ${id} não encontrado para remoção.`,
      );
    }

    await this.clubsRepository.delete({ id });

    await this.activityRepository.create({
      user: userName,
      actionType: 'delete',
      entity: 'club',
      description: `${userName} removed the club "${club.name}".`,
    });

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
