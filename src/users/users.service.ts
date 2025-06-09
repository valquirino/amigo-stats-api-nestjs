import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from './../shared/infrastructure/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new BadRequestException('Usuário já cadastrado com esse e-mail.');
    }

    return this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    await this.usersRepository.update(updateUserDto, { id });
    return this.usersRepository.findOne({ id });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    await this.usersRepository.delete({ id });
    return { message: `Usuário com id ${id} removido com sucesso.` };
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
    }
    return user;
  }
}
