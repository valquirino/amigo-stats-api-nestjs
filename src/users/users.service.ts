import { ActivityRepository } from 'src/shared/infrastructure/repositories/activities.repository';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UsersRepository } from './../shared/infrastructure/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordrDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly activityRepository: ActivityRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new BadRequestException('Usuário já cadastrado com esse e-mail.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async getCurrentUser(id: number) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userName: string) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    await this.usersRepository.update(updateUserDto, { id });

    await this.activityRepository.create({
      user: userName,
      actionType: 'edit',
      entity: 'user',
      description: `${userName} updated his profile.`,
    });

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

  async renderProfile(id: number) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    return await this.usersRepository.renderUserProfile({ id });
  }

  async updatePassword(id: number, updateUserPassword: UpdatePasswordrDto) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    const invalidPassword = await bcrypt.compare(
      updateUserPassword.currentPassword,
      user.password,
    );

    if (!invalidPassword) {
      throw new ConflictException(
        'senha passada nao corresponde com a senha atual ',
      );
    }

    const newPassword = await bcrypt.hash(updateUserPassword.newPassword, 10);

    await this.usersRepository.update({ password: newPassword }, { id });
    return this.usersRepository.findOne({ id });
  }
}
