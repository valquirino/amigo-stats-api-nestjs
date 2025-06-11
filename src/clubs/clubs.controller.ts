import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ITokenPayload } from 'src/shared/interfaces/token-payload.interface';

@Controller('clubs')
export class ClubsController {
  constructor(
    private readonly clubsService: ClubsService,
    @Inject(REQUEST)
    private readonly request: Request & { user: ITokenPayload },
  ) {}

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto);
  }

  @Get()
  findAll() {
    return this.clubsService.findAll(this.request.user.userId);
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.clubsService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(+id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.remove(+id);
  }
}
