import { NotFoundException, Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { User } from 'src/modules/users/entity/user.entity';
import { Role } from 'src/modules/roles/entity/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserDto, IUser } from '../types/User';
import { UserRole } from '../../roles/entity/user_roles.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>
  ) {}

  async selectAllUsers(): Promise<User[] | null> {
    return this.userRepository.find({ relations: {
        userRoles: {
          role: true
        },
      }, });
  }

  async selectUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  private async validateUserCreation(userDto: ICreateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { login: userDto.login },
        { email: userDto.email }
      ]
    });

    if (existingUser) {
      throw new ConflictException('User with this login or email already exists');
    }
  }

  async createUser(userDto: ICreateUserDto): Promise<User> {
    try {
      await this.validateUserCreation(userDto);

      const role = await this.findRoleOrFail(userDto.role);
      const newUser = this.userRepository.create({
        login: userDto.login,
        email: userDto.email,
        password: userDto.password,
        userRoles: [role]
      });
      const user = await this.userRepository.save(newUser);
      await this.createUserRole({
        user: user,
        role
      });
      return user;
    }
    catch (e) {
      throw new BadRequestException({
        message: e.message,
        error: e.error
      });
    }
  }

  async createUserRole({user, role}) {
    try {
      await this.userRoleRepository.save({ user, role });
    }
    catch (e) {
      console.error(e)
      throw new BadRequestException({
        message: 'Failed to create user role relation',
        error: e.error
      });
    }
  }

  private async findRoleOrFail(roleId: number): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId }
    });

    if (!role) {
      throw new NotFoundException(
        {
          message: 'Role does not exist',
          error: `Role not found, please create role with id: ${roleId}`
        }
      );
    }
    return role;
  }
}
