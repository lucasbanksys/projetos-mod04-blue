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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserRole } from './enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createUser(@Body() data: CreateUserDto) {
    delete data.passwordConfirmation;
    return this.usersService.create(data, UserRole.USER);
  }

  @Post('register-admin')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createAdmin(@Body() data: CreateUserDto) {
    delete data.passwordConfirmation;
    return this.usersService.create(data, UserRole.ADMIN);
  }

  @Get('find')
  @UseGuards(AuthGuard(), RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
