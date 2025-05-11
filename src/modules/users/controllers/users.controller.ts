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

@Controller('/api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/users')
  async getUsers(): Promise<IUser[]> {
    const users = await this.usersService.selectAllUsers();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }
  @Get('/users/:id')
  async getUser(@Param('id') id: number): Promise<IUser> {
    const user = await this.usersService.selectUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Post('/users/create')
  async createUser(@Body() user: IUser) {
    try {
      return await this.usersService.createUser(user);
    } catch {
      throw new BadRequestException('User not created');
    }
  }
  @Put('/users/update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: IUser,
  ): Promise<IUser> {
    try {
      return await this.usersService.updateUser(id, user);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('User not updated');
    }
  }
}
