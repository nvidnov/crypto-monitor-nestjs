import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthLoginDto, IAuthLoginResponse } from '../types/Auth';
import { User } from '../../users/entity/user.entity';
import { UsersService } from '../../users/services/user.services';
import { ICreateUserDto, ISanitizeUser } from '../../users/types/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verifyPassword } from '../../../common/password/hashPassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(dto: IAuthLoginDto): Promise<IAuthLoginResponse> {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await this.checkValidation(dto.password, user.password);

    if (!isValid) throw new UnauthorizedException();
    try {
      return {
        user: this.sanitizeUser(user),
        accessToken: await this.generateToken(user),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error during login');
    }
  }

  async registration(dto: ICreateUserDto): Promise<User> {
    return await this.userService.createUser(dto);
  }

  async checkValidation(dtoPassword: string, userPassword: string): Promise<boolean> {
    return await verifyPassword(dtoPassword, userPassword);
  }

  async generateToken(user: User): Promise<string> {
    const payload = { ...user };
    return await this.jwtService.signAsync(payload);
  }

  private sanitizeUser(user: User): ISanitizeUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
