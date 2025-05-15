import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IAuthLoginDto, IAuthRegisterDto } from '../types/Auth';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: IAuthLoginDto) {
    return this.authService.login(dto);
  }

  @Post('registration')
  async registration(@Body() dto: IAuthRegisterDto): Promise<User> {
    try {
      return await this.authService.registration(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
