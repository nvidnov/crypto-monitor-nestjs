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
  async createRole(id: IdRole): Promise<IRole> {
    // Проверка: Если ID меньше 1 или больше 3 кидаем ошибку
    if(id < IdRole.ADMIN || id > IdRole.USER ) {
      throw new NotFoundException('Id is not corrected');
    }
    let rolesMap: Record<IdRole, IRole>;
    rolesMap = {
      [IdRole.ADMIN]: {
        id: IdRole.ADMIN,
        name: ERole.ADMIN,
        description: DescriptionRole.ADMIN,
      },
      [IdRole.CURATOR]: {
        id: IdRole.CURATOR,
        name: ERole.CURATOR,
        description: DescriptionRole.CURATOR,
      },
      [IdRole.USER]: {
        id: IdRole.USER,
        name: ERole.USER,
        description: DescriptionRole.USER,
      },
    };
    const baseRole = rolesMap[id] ?? rolesMap[IdRole.USER];
    const role: IRole = {
      ...baseRole,
    };
    // Проверка: есть ли уже такая роль
    const existing = await this.rolesRepository.findOne({ where: { id: baseRole.id } });
    if (existing) {
      throw new BadRequestException('Role already exists');
    }
    try {
      return  await this.rolesRepository.save(role);
    } catch (e) {
      throw new BadRequestException('Failed to create role');
    }
  }
}
