import { Module } from '@nestjs/common';
import { DatabaseConfig } from './config/database.config';
import { User } from './modules/users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/entity/roles.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
