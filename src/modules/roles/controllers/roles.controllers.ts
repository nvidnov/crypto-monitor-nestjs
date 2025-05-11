import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { ICreateRoleDto, IRole } from '../types/Role';

@Controller('/api')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('/roles/get')
  async getRoles(): Promise<IRole[]> {
    const roles = await this.rolesService.getRoles();
    return roles;
  }
  @Post('/roles/create')
  async createRole(@Body() dto: ICreateRoleDto): Promise<IRole> {
    const { id } = dto
    return await this.rolesService.createRole(id);
  }
}
