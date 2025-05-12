import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './roles.entity';
import { User } from '../../users/entity/user.entity';

@Entity('UserRole')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role)=> role.usersRoles)
  role: Role;

  @ManyToOne(() => User, (user)=> user.userRoles)
  user: User;

  @Column({ type:'timestamp', default: () => "CURRENT_TIMESTAMP" }) // установить значение по умолчанию
  assignedAt?: Date;
}
