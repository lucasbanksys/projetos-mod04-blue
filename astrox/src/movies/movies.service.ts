import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Movie, User } from '@prisma/client';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MovieCreateInput): Promise<Movie> {
    const movie = await this.prisma.movie.create({ data });
    return movie;
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Filme Não encontrado na base de dados');
    }

    return movie;
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany();
    return movies;
  }

  async update(id: string, data: UpdateMovieDto) {
    return await this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const movie = await this.prisma.movie.delete({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Filme Não encontrado na base de dados');
    }
    return {
      message: 'Filme deletado com sucesso!',
    };
  }

  async likeMovie(userId: string, movieId: string): Promise<User> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        movies: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        movies: true,
      },
    });
  }
}
