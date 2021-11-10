import { IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  year: string;

  @IsString()
  length: string;

  @IsString()
  storyline: string;

  @IsString()
  image: string;
}
