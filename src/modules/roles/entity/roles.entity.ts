import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ERole } from '../types/enum';
import { UserRole } from './user_roles.entity';

@Entity('Role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ERole })
  name: ERole;

  @Column()
  description: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  usersRoles: UserRole[];
}
