import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/modules/users/entity/user.entity';
import { ERole } from '../types/enum';

@Entity('Role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ERole })
  name: ERole;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({ name: 'user_roles' }) // таблица связи
  users: User[];
}
