import {
  NotFoundException,
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { User } from 'src/modules/users/entity/user.entity';
import { Role } from 'src/modules/roles/entity/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserDto } from '../types/User';
import { UserRole } from '../../roles/entity/user_roles.entity';
import { hashPassword } from '../../../common/password/hashPassword';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async selectAllUsers(): Promise<User[] | null> {
    return this.userRepository.find({
      relations: {
        userRoles: {
          role: true,
        },
      },
    });
  }

  async selectUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async validateUserCreation(userDto: ICreateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: [{ login: userDto.login }, { email: userDto.email }],
    });

    if (existingUser) {
      throw new ConflictException('User with this login or email already exists');
    }
  }

  async createUser(userDto: ICreateUserDto): Promise<User> {
    try {
      await this.validateUserCreation(userDto);
      const hash = await hashPassword(userDto.password);
      const role = await this.findRoleOrFail(userDto.role);
      const newUser = this.userRepository.create({
        login: userDto.login,
        email: userDto.email,
        password: hash,
        userRoles: [role],
      });
      const user = await this.userRepository.save(newUser);
      await this.createUserRole(user, role);
      return user;
    } catch (e) {
      throw new BadRequestException({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: e.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error: e.error,
      });
    }
  }

  async createUserRole(user: User, role: Role): Promise<void> {
    try {
      const dto = { user: user, role: role };
      await this.userRoleRepository.save(dto);
    } catch (e) {
      console.error(e);
      throw new BadRequestException({
        message: 'Failed to create user role relation',
        error: e.error,
      });
    }
  }

  private async findRoleOrFail(roleId: number): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException({
        message: 'Role does not exist',
        error: `Role not found, please create role with id: ${roleId}`,
      });
    }
    return role;
  }
}
