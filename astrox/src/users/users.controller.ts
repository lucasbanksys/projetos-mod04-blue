import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserRole } from './enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createUser(@Body() data: CreateUserDto) {
    delete data.passwordConfirmation;
    return this.usersService.create(data, UserRole.USER);
  }

  @Post('register-admin')
  createAdmin(@Body() data: CreateUserDto) {
    delete data.passwordConfirmation;
    return this.usersService.create(data, UserRole.ADMIN);
  }

  @Get('find')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
