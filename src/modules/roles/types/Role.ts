import { ERole, IdRole } from './enum';

export interface IRole {
  id: number;
  name: ERole;
  description: string;
}

export interface ICreateRoleDto {
  id: IdRole;
}
