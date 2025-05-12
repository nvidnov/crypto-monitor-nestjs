//??
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
