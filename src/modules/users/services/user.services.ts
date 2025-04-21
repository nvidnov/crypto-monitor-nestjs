import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): { id: number; name: string }[] {
    return [
      {
        id: 0,
        name: 'John',
      },
      {
        id: 1,
        name: 'Jane',
      },
    ];
  }
  getUser(id: string): { id: number; name: string } | undefined {
    return this.getUsers().find((user) => user.id === parseInt(id));
  }
}
