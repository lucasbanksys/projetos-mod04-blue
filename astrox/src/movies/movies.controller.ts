import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/users/enum/role.enum';
import { RolesGuard } from 'src/auth/role.guards';
import { Role } from 'src/auth/role.decorator';
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('add')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get('find')
  @UseGuards(AuthGuard())
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch('update/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeMovie(
    @AuthUser() user: User,
    @Param('id') movieId: string,
  ): Promise<User> {
    const userId = user.id;
    return this.moviesService.likeMovie(userId, movieId);
  }
}
