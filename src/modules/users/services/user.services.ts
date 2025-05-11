import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entity/user.entity';
import { Role } from 'src/modules/roles/entity/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../types/User';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}
  async selectAllUsers(): Promise<IUser[]> {
    return (await this.userRepository.query(
      'select * from Users',
    )) as Promise<IUser[]>;
  }
  async selectUserById(id: number): Promise<IUser> {
    return (await this.userRepository.query(
      'select * from Users where id = $1',
      [id],
    )) as Promise<IUser>;
  }
  async createUser({ login, email, password, role }: IUser) {
    const roleDto = await this.rolesRepository.findOne({
      where: {
        id: role,
      }
    })
    return await this.userRepository.save({
      login,
      email,
      password,
      role: roleDto, // приведение enum, если надо
      createdAt: new Date(), // добавляем явно, если база не делает этого автоматически
    });
  }
  async updateUser(
    id: number,
    { login, email, password }: IUser,
  ): Promise<IUser> {
    await this.userRepository.query(
      'update Users set login = $1, email = $2, password = $3 where id = $4',
      [login, email, password, id],
    );
    return  await this.selectUserById(id);
  }
}
