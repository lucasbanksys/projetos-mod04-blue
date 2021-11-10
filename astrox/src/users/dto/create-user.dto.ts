import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 16)
  password: string;

  @IsString()
  @Length(6, 16)
  passwordConfirmation: string;
}
