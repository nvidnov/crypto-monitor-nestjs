import { DataSource } from 'typeorm';
import { User } from '../modules/users/entity/user.entity';
import { Role } from '../modules/roles/entity/roles.entity';
import { UserRole } from '../modules/roles/entity/user_roles.entity';

import 'dotenv/config';

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  subscribers: ['src/subscriber/**/*.ts'],
  migrationsTableName: 'migrations',
  entities: [User, Role, UserRole],
  migrations: ['src/migrations/**/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

export default AppDataSource;
