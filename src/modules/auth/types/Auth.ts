import { ISanitizeUser } from '../../users/types/User';

export interface IAuthLoginDto {
  email: string;
  password: string;
}

export interface IAuthRegisterDto {
  login: string;
  password: string;
  email: string;
  role: number;
}

export interface IAuthLoginResponse {
  user: ISanitizeUser;
  accessToken: string;
}
