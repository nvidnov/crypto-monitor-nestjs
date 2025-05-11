import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { User } from '../modules/users/entity/user.entity';
import { Role } from '../modules/roles/entity/roles.entity';

export const DatabaseConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Role],
  // synchronize: process.env.PROD === 'false' ? true : false,
};
