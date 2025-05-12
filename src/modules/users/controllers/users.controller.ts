import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/user.services';
import { IUser } from '../types/User';
import { User } from '../entity/user.entity';

@Controller('/api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/users')
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.selectAllUsers();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: number): Promise<User> {
    const User = await this.usersService.selectUserById(id);
    if (!User) {
      throw new NotFoundException('User not found');
    }
    return User;
  }

  @Post('/users/create')
  async createUser(@Body() user: IUser) {
    try {
      return await this.usersService.createUser(user);
    } catch(e) {
      throw new BadRequestException(e);
    }
  }
}
