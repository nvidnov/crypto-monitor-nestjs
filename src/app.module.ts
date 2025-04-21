import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { UsersService } from './modules/users/services/user.services';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forRoot(databaseConfig)],
})
export class AppModule {}
