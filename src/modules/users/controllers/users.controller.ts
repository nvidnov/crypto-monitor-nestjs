import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/user.services';
import { ICreateUserDto } from '../types/User';
import { User } from '../entity/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Получить всех пользователей ',
    description: 'Получить всех пользователей и их Роли из базы данных',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/users')
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.selectAllUsers();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  @ApiOperation({ description: 'Получить пользователя по ID' })
  @Get('/users/:id')
  async getUser(@Param('id') id: number): Promise<User> {
    const User = await this.usersService.selectUserById(id);
    if (!User) {
      throw new NotFoundException('User not found');
    }
    return User;
  }

  @ApiOperation({ description: 'Создать пользователя' })
  @Post('/users/create')
  async createUser(@Body() user: ICreateUserDto) {
    try {
      return await this.usersService.createUser(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
