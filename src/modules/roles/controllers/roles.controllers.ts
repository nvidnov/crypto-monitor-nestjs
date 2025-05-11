import { Controller, Get, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { IRole } from '../types/Role';

@Controller('/api')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('/roles/get')
  async getRoles(): Promise<IRole[]> {
    const roles = await this.rolesService.getRoles();
    return roles;
  }
  @Post('/roles/create')
  async createRole(): Promise<IRole> {
    const newRole = await this.rolesService.createRole();
    return newRole;
  }
}
