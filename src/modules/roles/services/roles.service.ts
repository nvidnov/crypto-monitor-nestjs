import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/roles.entity';
import { IRole } from '../types/Role';
import { ERole, IdRole, DescriptionRole } from '../types/enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}
  async getRoles(): Promise<IRole[]> {
    const roles = await this.rolesRepository.find();
    if (roles.length === 0) {
      throw new NotFoundException('Roles not found');
    }
    return roles;
  }
  async createRole(): Promise<IRole> {
    if ((await this.rolesRepository.find()).length === 0) {
      await this.rolesRepository.save({
        id: IdRole.ADMIN,
        name: ERole.ADMIN,
        description: DescriptionRole.ADMIN,
      });
    } else {
      throw new BadRequestException('Roles already exist');
    }
    return (await this.getRoles())[0];
  }
}
