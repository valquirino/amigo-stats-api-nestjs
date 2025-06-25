import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/shared/infrastructure/decorators/public.decorator';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import { UpdatePasswordrDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(REQUEST)
    private readonly request: RequestWithUser,
  ) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put('update-profile')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(
      this.request.user.userId,
      updateUserDto,
      this.request.user.name,
    );
  }

  @Delete(':id')
  remove() {
    return this.usersService.remove(
      this.request.user.userId,
      this.request.user.name,
    );
  }

  @Get('profile')
  getProfile() {
    return this.usersService.renderProfile(this.request.user.userId);
  }

  @Put('update-password')
  updatePassword(@Body() updateUserPassword: UpdatePasswordrDto) {
    return this.usersService.updatePassword(
      this.request.user.userId,
      updateUserPassword,
    );
  }
}
