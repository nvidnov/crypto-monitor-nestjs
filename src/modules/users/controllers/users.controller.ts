import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/user.services';
import { IUser } from '../types/User';
@Controller('/api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/users')
  getUsers(): IUser[] {
    return this.usersService.getUsers();
  }
  @Get('/users/:id')
  getUser(@Param('id') id: string): IUser {
    const user = this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
