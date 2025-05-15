//??
import { UserRole } from '../../roles/entity/user_roles.entity';

export interface IUser {
  id: number;
  login: string;
  password: string;
  email: string;
  role: number;
}

export interface ICreateUserDto {
  login: string;
  password: string;
  email: string;
  role: number;
}

export interface ISanitizeUser {
  id: number;
  login: string;
  email: string;
  userRoles: UserRole[];
}
