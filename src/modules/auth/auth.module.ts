import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/services/user.services';
import { Role } from '../roles/entity/roles.entity';
import { UserRole } from '../roles/entity/user_roles.entity';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole]),
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Секретный ключ
      signOptions: {
        expiresIn: '24h',
      }, // Время жизни токена
    }),
  ],
})
export class AuthModule {}
