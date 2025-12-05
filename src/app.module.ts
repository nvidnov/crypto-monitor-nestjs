import { Module } from '@nestjs/common';
import { DatabaseConfig } from './config/database.config';
import { User } from './modules/users/entity/user.entity';
import { Role } from './modules/roles/entity/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { VerificationModule } from './modules/verification-code/verification-code.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    RolesModule,
    AuthModule,
    VerificationModule
  ],
})
export class AppModule {}
